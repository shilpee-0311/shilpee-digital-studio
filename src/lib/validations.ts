import { z } from "zod";

export const SERVICE_TYPES = [
  "website-development",
  "software-apps",
  "data-analytics",
  "graphic-design",
  "digital-invitations",
  "social-media",
] as const;

export const SERVICE_NAMES: Record<(typeof SERVICE_TYPES)[number], string> = {
  "website-development": "Website Development",
  "software-apps": "Software & Web Applications",
  "data-analytics": "Data Analytics & Automation",
  "graphic-design": "Graphic Design & Canva",
  "digital-invitations": "Digital Invitations",
  "social-media": "Social Media Management",
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
