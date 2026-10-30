import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { demoProjects } from "../src/content/demo-projects";

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME?.trim();
  const rawAdminPassword = process.env.ADMIN_INITIAL_PASSWORD;

  if (!adminUsername || !rawAdminPassword || rawAdminPassword.length < 8) {
    throw new Error(
      "Set ADMIN_USERNAME and ADMIN_INITIAL_PASSWORD (min 8 characters) in .env before seeding."
    );
  }

  const passwordHash = await bcrypt.hash(rawAdminPassword, 12);

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: { passwordHash },
    create: {
      username: adminUsername,
      passwordHash,
      name: "Studio Administrator",
      role: "admin",
    },
  });

  for (const project of demoProjects) {
    const record = {
      slug: project.slug,
      title: project.title,
      category: project.category,
      badgeType: project.badgeType,
      summary: project.summary,
      fullDescription: project.fullDescription,
      techStack: project.techStack,
      features: JSON.stringify(project.features),
      deliverables: JSON.stringify(project.deliverables),
      previewUrl: project.previewUrl || null,
      thumbnail: project.thumbnail,
      isFeatured: project.isFeatured,
      sortOrder: project.sortOrder,
    };

    await prisma.portfolioProject.upsert({
      where: { slug: project.slug },
      update: record,
      create: record,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
