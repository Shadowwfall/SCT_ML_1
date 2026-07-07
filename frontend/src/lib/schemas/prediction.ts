import { z } from "zod";

export const predictionSchema = z.object({
  square_footage: z
    .number({ required_error: "Square footage is required", invalid_type_error: "Square footage must be a number" })
    .positive("Square footage must be greater than 0"),
  bedrooms: z
    .number({ required_error: "Bedrooms is required", invalid_type_error: "Bedrooms must be a number" })
    .nonnegative("Bedrooms cannot be negative"),
  bathrooms: z
    .number({ required_error: "Bathrooms is required", invalid_type_error: "Bathrooms must be a number" })
    .nonnegative("Bathrooms cannot be negative"),
  neighborhood_rating: z
    .number({ required_error: "Neighborhood rating is required", invalid_type_error: "Neighborhood rating must be a number" })
    .min(1, "Rating must be at least 1")
    .max(10, "Rating cannot exceed 10"),
  school_rating: z
    .number({ required_error: "School rating is required", invalid_type_error: "School rating must be a number" })
    .min(1, "Rating must be at least 1")
    .max(10, "Rating cannot exceed 10"),
  property_age: z
    .number({ required_error: "Property age is required", invalid_type_error: "Property age must be a number" })
    .nonnegative("Property age cannot be negative"),
  lot_size: z
    .number({ required_error: "Lot size is required", invalid_type_error: "Lot size must be a number" })
    .positive("Lot size must be greater than 0"),
});

export type PredictionFormData = z.infer<typeof predictionSchema>;
