import { NextRequest } from "next/server";
import { prisma } from "../src/lib/prisma";
import { GET as getAdminBlogPosts, POST as createAdminBlogPost } from "../src/app/api/admin/blog/route";
import {
  GET as getAdminPostById,
  PATCH as updateAdminPost,
  DELETE as deleteAdminPost,
} from "../src/app/api/admin/blog/[id]/route";
import { createSessionToken, SESSION_COOKIE_NAME } from "../src/lib/session";
import sitemap from "../src/app/sitemap";

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

async function runBlogTestSuite() {
  console.log("\n🧪 STARTING DEDICATED BLOG & SEO TEST SUITE\n");

  // Generate valid test admin session token
  const adminToken = await createSessionToken({
    userId: "test-admin-id",
    username: "admin",
    role: "admin",
  });
  const authHeaders = {
    "Content-Type": "application/json",
    Cookie: `${SESSION_COOKIE_NAME}=${adminToken}`,
  };

  // -------------------------------------------------------------
  // SUITE 1: Admin API Security & Authentication Guards
  // -------------------------------------------------------------
  console.log("👉 Suite 1: Admin Blog API Security & Access Control");

  // 1.1: Unauthorized GET /api/admin/blog
  const unauthGetReq = new NextRequest("http://localhost:3000/api/admin/blog");
  const unauthGetRes = await getAdminBlogPosts(unauthGetReq);
  assert(unauthGetRes.status === 401, "GET /api/admin/blog without auth returns 401 Unauthorized");

  // 1.2: Unauthorized POST /api/admin/blog
  const unauthPostReq = new NextRequest("http://localhost:3000/api/admin/blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Hack Title", slug: "hack-slug" }),
  });
  const unauthPostRes = await createAdminBlogPost(unauthPostReq);
  assert(unauthPostRes.status === 401, "POST /api/admin/blog without auth returns 401 Unauthorized");

  // 1.3: Unauthorized PATCH /api/admin/blog/[id]
  const unauthPatchReq = new NextRequest("http://localhost:3000/api/admin/blog/fake-id", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Updated Hack" }),
  });
  const unauthPatchRes = await updateAdminPost(unauthPatchReq, {
    params: Promise.resolve({ id: "fake-id" }),
  });
  assert(unauthPatchRes.status === 401, "PATCH /api/admin/blog/[id] without auth returns 401 Unauthorized");

  // 1.4: Unauthorized DELETE /api/admin/blog/[id]
  const unauthDelReq = new NextRequest("http://localhost:3000/api/admin/blog/fake-id", {
    method: "DELETE",
  });
  const unauthDelRes = await deleteAdminPost(unauthDelReq, {
    params: Promise.resolve({ id: "fake-id" }),
  });
  assert(unauthDelRes.status === 401, "DELETE /api/admin/blog/[id] without auth returns 401 Unauthorized");

  // -------------------------------------------------------------
  // SUITE 2: Post Lifecycle (Draft -> Publish -> Edit -> Unpublish -> Delete)
  // -------------------------------------------------------------
  console.log("\n👉 Suite 2: Complete Post Lifecycle & State Transitions");

  const testSlug = "audit-automated-test-article";
  // Clean any old test residue
  await prisma.blogPost.deleteMany({ where: { slug: testSlug } });

  const postPayload = {
    title: "Audit Automated Test Article",
    slug: testSlug,
    excerpt: "This is a strictly automated verification article testing full lifecycle state machine.",
    content: "## Section 1\n\nArticle content for verification testing with code and tables.\n\n```python\nprint('verified')\n```",
    category: "Web Development",
    categorySlug: "web-development",
    tags: "Testing, Next.js, Audit",
    author: "Shilpee Srivastava",
    status: "DRAFT",
    isFeatured: false,
    seoTitle: "Audit Automated Test Article SEO",
    seoDescription: "Audit automated test description for verification.",
    readingTime: 4,
  };

  // 2.1: Create Draft Post
  const createReq = new NextRequest("http://localhost:3000/api/admin/blog", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(postPayload),
  });
  const createRes = await createAdminBlogPost(createReq);
  const createData = await createRes.json();
  assert(createRes.status === 201 && createData.success === true, "Authorized admin can create article in DRAFT status");
  const createdId = createData.post.id;

  // 2.2: Verify Slug Collision Rejection
  const clashReq = new NextRequest("http://localhost:3000/api/admin/blog", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(postPayload),
  });
  const clashRes = await createAdminBlogPost(clashReq);
  assert(clashRes.status === 409, "Creating post with colliding duplicate slug returns 409 Conflict");

  // 2.3: Verify Draft Seclusion (Draft is NOT exposed in public query)
  const publicPublishedBefore = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
  });
  const isDraftLeaking = publicPublishedBefore.some((p) => p.id === createdId);
  assert(!isDraftLeaking, "Draft article is strictly hidden from public published article queries");

  // 2.4: Publish Article via PATCH
  const publishReq = new NextRequest(`http://localhost:3000/api/admin/blog/${createdId}`, {
    method: "PATCH",
    headers: authHeaders,
    body: JSON.stringify({
      ...postPayload,
      status: "PUBLISHED",
    }),
  });
  const publishRes = await updateAdminPost(publishReq, {
    params: Promise.resolve({ id: createdId }),
  });
  const publishData = await publishRes.json();
  assert(
    publishRes.status === 200 && publishData.post.status === "PUBLISHED" && publishData.post.publishedAt !== null,
    "Publishing article sets status to PUBLISHED and populates publishedAt timestamp"
  );

  // 2.5: Verify Public Visibility After Publishing
  const publicNow = await prisma.blogPost.findUnique({
    where: { slug: testSlug },
  });
  assert(publicNow !== null && publicNow.status === "PUBLISHED", "Published article is immediately queryable by slug");

  // 2.6: Edit Post Content
  const editReq = new NextRequest(`http://localhost:3000/api/admin/blog/${createdId}`, {
    method: "PATCH",
    headers: authHeaders,
    body: JSON.stringify({
      ...postPayload,
      status: "PUBLISHED",
      title: "Audit Automated Test Article (Updated)",
    }),
  });
  const editRes = await updateAdminPost(editReq, {
    params: Promise.resolve({ id: createdId }),
  });
  const editData = await editRes.json();
  assert(
    editRes.status === 200 && editData.post.title === "Audit Automated Test Article (Updated)",
    "Admin can edit published post title without losing publication state"
  );

  // 2.7: Unpublish Post (Transition back to DRAFT)
  const unpublishReq = new NextRequest(`http://localhost:3000/api/admin/blog/${createdId}`, {
    method: "PATCH",
    headers: authHeaders,
    body: JSON.stringify({
      ...postPayload,
      status: "DRAFT",
    }),
  });
  const unpublishRes = await updateAdminPost(unpublishReq, {
    params: Promise.resolve({ id: createdId }),
  });
  const unpublishData = await unpublishRes.json();
  assert(unpublishRes.status === 200 && unpublishData.post.status === "DRAFT", "Admin can transition published article back to DRAFT");

  // Verify unpublish immediately hides from public
  const publicAfterUnpublish = await prisma.blogPost.findFirst({
    where: { slug: testSlug, status: "PUBLISHED" },
  });
  assert(publicAfterUnpublish === null, "Unpublished article is immediately inaccessible from public published queries");

  // 2.8: Delete Post via DELETE
  const deleteReq = new NextRequest(`http://localhost:3000/api/admin/blog/${createdId}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  const deleteRes = await deleteAdminPost(deleteReq, {
    params: Promise.resolve({ id: createdId }),
  });
  assert(deleteRes.status === 200, "Admin can delete blog post via DELETE endpoint");

  const deletedCheck = await prisma.blogPost.findUnique({ where: { id: createdId } });
  assert(deletedCheck === null, "Deleted blog post permanently removed from database");

  // -------------------------------------------------------------
  // SUITE 3: Search, Category Filtering & Dynamic Sitemap
  // -------------------------------------------------------------
  console.log("\n👉 Suite 3: Search, Category Filtering & Dynamic XML Sitemap");

  // 3.1: Category Filtering
  const webDevPosts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED", categorySlug: "web-development" },
  });
  assert(webDevPosts.length > 0, "Querying by categorySlug 'web-development' returns published category articles");

  // 3.2: Keyword Search Filtering
  const searchResults = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { title: { contains: "Next.js" } },
        { excerpt: { contains: "Next.js" } },
        { tags: { contains: "Next.js" } },
      ],
    },
  });
  assert(searchResults.length > 0, "Keyword search across title, excerpt, and tags returns matching articles");

  // 3.3: Dynamic XML Sitemap Audit
  const sitemapEntries = await sitemap();
  const sitemapUrls = sitemapEntries.map((e) => e.url);

  assert(sitemapUrls.some((u) => u.endsWith("/blog")), "Sitemap contains public /blog index URL");
  assert(sitemapUrls.some((u) => u.includes("/blog/category/")), "Sitemap contains category archive URLs");
  assert(sitemapUrls.some((u) => u.includes("/blog/why-modern-businesses-are-moving-to-nextjs")), "Sitemap contains published article URLs");

  // Verify drafts never enter sitemap
  const tempDraft = await prisma.blogPost.create({
    data: {
      title: "Hidden Temp Draft",
      slug: "hidden-temp-draft",
      excerpt: "Excerpt for sitemap test",
      content: "Content",
      category: "Web Development",
      categorySlug: "web-development",
      status: "DRAFT",
    },
  });

  const sitemapAfterDraft = await sitemap();
  const draftInSitemap = sitemapAfterDraft.some((e) => e.url.includes("hidden-temp-draft"));
  assert(!draftInSitemap, "Draft post is strictly excluded from XML sitemap generation");

  // Clean up temp draft
  await prisma.blogPost.delete({ where: { id: tempDraft.id } });

  console.log("\n==================================================");
  console.log(`🏁 BLOG TEST SUITE: ${passed} PASSED | ${failed} FAILED`);
  console.log("==================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runBlogTestSuite()
  .catch((err) => {
    console.error("Test runner error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
