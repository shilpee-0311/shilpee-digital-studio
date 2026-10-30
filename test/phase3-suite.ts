import { NextRequest } from "next/server";
import { prisma } from "../src/lib/prisma";
import { POST as submitEnquiry } from "../src/app/api/enquiries/route";
import { POST as adminLogin } from "../src/app/api/admin/auth/login/route";
import { POST as adminLogout } from "../src/app/api/admin/auth/logout/route";
import { GET as getEnquiries } from "../src/app/api/admin/enquiries/route";
import { PATCH as updateEnquiry } from "../src/app/api/admin/enquiries/[id]/route";
import { POST as addNote } from "../src/app/api/admin/enquiries/[id]/notes/route";
import { GET as exportCsv } from "../src/app/api/admin/enquiries/export/route";
import { createSessionToken, SESSION_COOKIE_NAME } from "../src/lib/session";

// Load local environment variables if available
if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(".env");
  } catch {
    // Ignore
  }
}

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName} ${detail ? `(${detail})` : ""}`);
    failed++;
  }
}

async function runPhase3Tests() {
  console.log("\n🧪 STARTING PHASE 3 BACKEND & ADMIN DASHBOARD TEST SUITE\n");

  // -------------------------------------------------------------
  // SUITE 1: Enquiry Form Backend Validation, Honeypot & DB
  // -------------------------------------------------------------
  console.log("👉 Suite 1: Public Enquiry Submission & Spam Protection");

  // Test 1.1: Valid Enquiry Submission
  const validPayload = {
    name: "Aarav Patel",
    email: "aarav.patel@testcorp.example",
    phone: "+91 98765 11111",
    serviceType: "website-development",
    budgetRange: "₹50k - ₹100k",
    timeline: "1-month",
    message: "We need a bespoke corporate marketing website with CMS integration.",
    website_url_check: "",
  };

  const req1 = new NextRequest("http://localhost:3000/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "198.51.100.1" },
    body: JSON.stringify(validPayload),
  });

  const res1 = await submitEnquiry(req1);
  const data1 = await res1.json();
  assert(res1.status === 201 && data1.success === true, "Valid enquiry submission returns 201 Created");

  const createdId = data1.enquiryId;
  const dbEnquiry = await prisma.enquiry.findUnique({ where: { id: createdId } });
  assert(dbEnquiry !== null && dbEnquiry.name === "Aarav Patel", "Enquiry correctly persisted in SQLite database");
  assert(dbEnquiry?.status === "NEW", "Initial enquiry status defaults to NEW");

  // Test 1.2: Invalid Input Validation (Zod rejection)
  const invalidPayload = {
    name: "A", // too short (min 2)
    email: "not-an-email",
    serviceType: "invalid-category",
    message: "Short", // < 10 chars
  };

  const req2 = new NextRequest("http://localhost:3000/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "198.51.100.2" },
    body: JSON.stringify(invalidPayload),
  });

  const res2 = await submitEnquiry(req2);
  const data2 = await res2.json();
  assert(res2.status === 400 && data2.success === false, "Invalid payload rejected with 400 Bad Request");
  assert(data2.fieldErrors !== undefined && data2.fieldErrors.email !== undefined, "Server returns field-level error messages");

  // Test 1.3: Honeypot Bot Spam Trap
  const initialCount = await prisma.enquiry.count();
  const botPayload = {
    name: "Spam Bot",
    email: "bot@spammer.example",
    serviceType: "website-development",
    message: "Cheap backlinks and SEO services click here immediately",
    website_url_check: "http://bot-trap.example", // Honeypot populated!
  };

  const req3 = new NextRequest("http://localhost:3000/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "198.51.100.3" },
    body: JSON.stringify(botPayload),
  });

  const res3 = await submitEnquiry(req3);
  const finalCount = await prisma.enquiry.count();
  assert(res3.status === 200, "Bot honeypot submission returns deceptive 200 OK");
  assert(initialCount === finalCount, "Bot submission is silently discarded without polluting database");

  // Test 1.4: Rate Limiting Defense
  const testIp = "203.0.113.99";
  let rateLimitHit = false;
  for (let i = 0; i < 6; i++) {
    const rlReq = new NextRequest("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": testIp },
      body: JSON.stringify(validPayload),
    });
    const rlRes = await submitEnquiry(rlReq);
    if (rlRes.status === 429) {
      rateLimitHit = true;
      break;
    }
  }
  assert(rateLimitHit, "Submitting >5 rapid requests from same IP triggers 429 Too Many Requests");

  // -------------------------------------------------------------
  // SUITE 2: Admin Authentication & Session Management
  // -------------------------------------------------------------
  console.log("\n👉 Suite 2: Admin Authentication & Session Protection");

  // Test 2.1: Login with Incorrect Password
  const badLoginReq = new NextRequest("http://localhost:3000/api/admin/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "198.51.100.10" },
    body: JSON.stringify({ username: "admin", password: "WrongPassword123!" }),
  });
  const badLoginRes = await adminLogin(badLoginReq);
  assert(badLoginRes.status === 401, "Admin login with bad credentials returns 401 Unauthorized");

  // Test 2.2: Login with Valid Credentials
  const envPassword = process.env.ADMIN_INITIAL_PASSWORD;
  const goodLoginReq = new NextRequest("http://localhost:3000/api/admin/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "198.51.100.11" },
    body: JSON.stringify({ username: "admin", password: envPassword }),
  });
  const goodLoginRes = await adminLogin(goodLoginReq);
  const goodLoginData = await goodLoginRes.json();
  assert(goodLoginRes.status === 200 && goodLoginData.success === true, "Valid admin login returns 200 OK");

  // Extract session token
  const setCookie = goodLoginRes.headers.get("set-cookie") || "";
  assert(setCookie.includes(SESSION_COOKIE_NAME), "Session issues HTTP-only cookie");

  // Generate verified session token for subsequent protected API tests
  const adminUser = await prisma.adminUser.findUnique({ where: { username: "admin" } });
  const validToken = await createSessionToken({
    userId: adminUser!.id,
    username: adminUser!.username,
    role: adminUser!.role,
  });

  // -------------------------------------------------------------
  // SUITE 3: Protected Admin Enquiries API & Dashboard Actions
  // -------------------------------------------------------------
  console.log("\n👉 Suite 3: Protected Admin Dashboard Operations");

  // Test 3.1: Unauthorized API access without session cookie
  const unauthReq = new NextRequest("http://localhost:3000/api/admin/enquiries", {
    method: "GET",
  });
  const unauthRes = await getEnquiries(unauthReq);
  assert(unauthRes.status === 401, "Accessing /api/admin/enquiries without cookie returns 401 Unauthorized");

  // Test 3.2: Authorized API access with valid session cookie
  const authReq = new NextRequest("http://localhost:3000/api/admin/enquiries", {
    method: "GET",
    headers: {
      cookie: `${SESSION_COOKIE_NAME}=${validToken}`,
    },
  });
  const authRes = await getEnquiries(authReq);
  const authData = await authRes.json();
  assert(authRes.status === 200 && authData.success === true, "Authorized access to /api/admin/enquiries returns 200 OK");
  assert(authData.stats !== undefined && typeof authData.stats.total === "number", "Returns calculated KPI stats overview");
  assert(Array.isArray(authData.enquiries), "Returns array of customer enquiries");

  // Test 3.3: Status Transitions (NEW -> REVIEWING -> QUOTED)
  const patchReq = new NextRequest(`http://localhost:3000/api/admin/enquiries/${createdId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      cookie: `${SESSION_COOKIE_NAME}=${validToken}`,
    },
    body: JSON.stringify({ status: "REVIEWING", isStarred: true }),
  });
  const patchRes = await updateEnquiry(patchReq, { params: Promise.resolve({ id: createdId }) });
  const patchData = await patchRes.json();
  assert(patchRes.status === 200 && patchData.enquiry.status === "REVIEWING", "Admin can transition enquiry status to REVIEWING");
  assert(patchData.enquiry.isStarred === true, "Admin can star enquiry");

  // Test 3.4: Adding Private Internal Notes
  const noteReq = new NextRequest(`http://localhost:3000/api/admin/enquiries/${createdId}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: `${SESSION_COOKIE_NAME}=${validToken}`,
    },
    body: JSON.stringify({ content: "Initial scope call completed. Agreed on ₹65,000 milestone quote." }),
  });
  const noteRes = await addNote(noteReq, { params: Promise.resolve({ id: createdId }) });
  const noteData = await noteRes.json();
  assert(noteRes.status === 201 && noteData.success === true, "Admin can post private internal follow-up notes");
  assert(noteData.note.content.includes("₹65,000"), "Internal note accurately saved and linked to enquiry");

  // Test 3.5: Export Enquiries to CSV
  const csvReq = new NextRequest("http://localhost:3000/api/admin/enquiries/export", {
    method: "GET",
    headers: {
      cookie: `${SESSION_COOKIE_NAME}=${validToken}`,
    },
  });
  const csvRes = await exportCsv(csvReq);
  const csvText = await csvRes.text();
  assert(csvRes.status === 200, "Admin can export enquiries as CSV file");
  assert(csvText.includes("Enquiry ID,Date (UTC),Name,Email"), "CSV includes standard sanitized header columns");
  assert(csvText.includes("Aarav Patel"), "CSV export contains real customer record data");

  // Test 3.6: Admin Logout
  const logoutRes = await adminLogout();
  const logoutSetCookie = logoutRes.headers.get("set-cookie") || "";
  assert(logoutRes.status === 200, "Admin logout returns 200 OK");
  assert(logoutSetCookie.includes("Max-Age=0") || logoutSetCookie.includes("expires="), "Admin logout clears session cookie");

  // -------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------
  console.log("\n==================================================");
  console.log(`🏁 TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("==================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase3Tests()
  .catch((e) => {
    console.error("Test runner crashed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
