import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");

const phoneSchema = z
  .string()
  .regex(/^\d{9}$/, "Phone number must be exactly 9 digits");

const fullNameSchema = z
  .string()
  .regex(/^[A-Za-z ]+$/, "Full name must contain only letters");

export const memberSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  university: z.string().min(1, "University required"),
  studentId: z.string().min(1, "Student ID required"),
  yearOfStudy: z.string().min(1, "Year of study required"),
});

export const formSchema = z.object({
  teamName: z.string().min(1, "Team name required"),
  teamSize: z.enum(["3", "4"]),
  leader: memberSchema,
  members: z.array(memberSchema).max(3),
});
