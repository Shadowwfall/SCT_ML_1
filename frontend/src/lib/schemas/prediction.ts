import { z } from "zod";

const numberErrorMap = (fieldName: string) => (issue: any) => {
  if (issue.code === "invalid_type") {
    if (issue.input === undefined || issue.input === null || (typeof issue.input === "number" && isNaN(issue.input))) {
      return `${fieldName} is required`;
    }
    return `${fieldName} must be a number`;
  }
  return undefined;
};

export const predictionSchema = z.object({
  square_footage: z
    .number({ error: numberErrorMap("Square footage") })
    .positive("Square footage must be greater than 0"),
  bedrooms: z
    .number({ error: numberErrorMap("Bedrooms") })
    .nonnegative("Bedrooms cannot be negative"),
  bathrooms: z
    .number({ error: numberErrorMap("Bathrooms") })
    .nonnegative("Bathrooms cannot be negative"),
  neighborhood_rating: z
    .number({ error: numberErrorMap("Neighborhood rating") })
    .min(1, "Rating must be at least 1")
    .max(10, "Rating cannot exceed 10"),
  school_rating: z
    .number({ error: numberErrorMap("School rating") })
    .min(1, "Rating must be at least 1")
    .max(10, "Rating cannot exceed 10"),
  property_age: z
    .number({ error: numberErrorMap("Property age") })
    .nonnegative("Property age cannot be negative"),
  lot_size: z
    .number({ error: numberErrorMap("Lot size") })
    .positive("Lot size must be greater than 0"),
});

export type PredictionFormData = z.infer<typeof predictionSchema>;
