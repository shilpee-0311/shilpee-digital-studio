-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "enquiries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "serviceType" TEXT NOT NULL,
    "budgetRange" TEXT,
    "timeline" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isStarred" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT NOT NULL DEFAULT 'WEBSITE_FORM',
    "ipAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "enquiry_notes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "enquiryId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "enquiry_notes_enquiryId_fkey" FOREIGN KEY ("enquiryId") REFERENCES "enquiries" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "portfolio_projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "badgeType" TEXT NOT NULL DEFAULT 'Demo Project',
    "summary" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "deliverables" TEXT,
    "previewUrl" TEXT,
    "thumbnail" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "coverImageAlt" TEXT,
    "category" TEXT NOT NULL,
    "categorySlug" TEXT NOT NULL,
    "tags" TEXT,
    "author" TEXT NOT NULL DEFAULT 'Shilpee Srivastava',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "readingTime" INTEGER NOT NULL DEFAULT 5,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_username_key" ON "admin_users"("username");

-- CreateIndex
CREATE INDEX "enquiries_status_createdAt_idx" ON "enquiries"("status", "createdAt");

-- CreateIndex
CREATE INDEX "enquiries_serviceType_idx" ON "enquiries"("serviceType");

-- CreateIndex
CREATE INDEX "enquiries_isArchived_idx" ON "enquiries"("isArchived");

-- CreateIndex
CREATE INDEX "enquiry_notes_enquiryId_idx" ON "enquiry_notes"("enquiryId");

-- CreateIndex
CREATE UNIQUE INDEX "portfolio_projects_slug_key" ON "portfolio_projects"("slug");

-- CreateIndex
CREATE INDEX "portfolio_projects_category_sortOrder_idx" ON "portfolio_projects"("category", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_status_publishedAt_idx" ON "blog_posts"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "blog_posts_categorySlug_idx" ON "blog_posts"("categorySlug");

-- CreateIndex
CREATE INDEX "blog_posts_isFeatured_idx" ON "blog_posts"("isFeatured");
