import { z } from "zod";

// Zod schema for booking form validation
export const bookingSchema = z.object({
  clientName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  clientEmail: z.string().email({ message: "Please enter a valid email address" }),
  clientPhone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  date: z.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a valid date",
  }).refine(
    (date) => {
      // Date should be at least 24 hours in the future
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return date >= tomorrow;
    },
    {
      message: "Appointment must be at least 24 hours in the future",
    }
  ),
  time: z.string({
    required_error: "Please select a time slot",
  }),
  duration: z.number({
    required_error: "Please select appointment duration",
    invalid_type_error: "Duration must be a number",
  }).int().min(30).max(480),
  tattooType: z.enum([
    "NEW_TATTOO", 
    "TOUCH_UP", 
    "COVER_UP", 
    "CONSULTATION"
  ], {
    required_error: "Please select a tattoo type",
  }),
  bodyPart: z.string().min(2, { message: "Please specify the body part" }),
  designDescription: z.string().min(10, { message: "Please provide at least a brief description" }).max(500, {
    message: "Description must be less than 500 characters",
  }),
  referenceImages: z.array(z.string()).optional().default([]),
});

// Combined schema that handles date/time as separate fields
export type BookingFormValues = z.infer<typeof bookingSchema>;
