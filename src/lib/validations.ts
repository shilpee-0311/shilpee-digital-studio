import { z } from "zod";

export const SERVICE_TYPES = [
  "website-development",
  "software-apps",
  "data-analytics",
  "graphic-design",
  "digital-invitations",
  "social-media",
  "motion-animation",
] as const;

export const SERVICE_NAMES: Record<(typeof SERVICE_TYPES)[number], string> = {
  "website-development": "Website Development",
  "software-apps": "Software & Web Applications",
  "data-analytics": "Data Analytics & Automation",
  "graphic-design": "Graphic Design & Canva",
  "digital-invitations": "Digital Invitations",
  "social-media": "Social Media Management",
  "motion-animation": "Motion Animation & VFX",
};

export const ENQUIRY_STATUSES = [
  "NEW",
  "REVIEWING",
  "QUOTED",
  "IN_PROGRESS",
  "COMPLETED",
  "ARCHIVED",
] as const;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(120, "Email cannot exceed 120 characters"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  serviceType: z.enum(SERVICE_TYPES),
  budgetRange: z.string().trim().max(100).optional().or(z.literal("")),
  timeline: z.string().trim().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please describe your project in at least 10 characters")
    .max(2500, "Message cannot exceed 2500 characters"),
  website_url_check: z.string().max(0, "Bot submission detected").optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const adminLoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username cannot exceed 50 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const updateEnquiryStatusSchema = z.object({
  status: z.enum(ENQUIRY_STATUSES),
  isStarred: z.boolean().optional(),
  isArchived: z.boolean().optional(),
});

export const addEnquiryNoteSchema = z.object({
  content: z
    .string()
    .trim()
    .min(2, "Note content must be at least 2 characters")
    .max(1500, "Note cannot exceed 1500 characters"),
});

export const blogPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters"),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(200, "Slug cannot exceed 200 characters"),
  excerpt: z
    .string()
    .trim()
    .min(10, "Excerpt must be at least 10 characters")
    .max(600, "Excerpt cannot exceed 600 characters"),
  content: z
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters"),
  coverImage: z.string().trim().optional().or(z.literal("")),
  coverImageAlt: z.string().trim().max(200).optional().or(z.literal("")),
  category: z.string().trim().min(2, "Category is required"),
  categorySlug: z.string().trim().min(2, "Category slug is required"),
  tags: z.string().trim().optional().or(z.literal("")),
  author: z.string().trim().min(2).default("Shilpee Srivastava"),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  isFeatured: z.boolean().default(false),
  seoTitle: z.string().trim().max(200).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(300).optional().or(z.literal("")),
  readingTime: z.number().int().min(1).max(60).default(5),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
