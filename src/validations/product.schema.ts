import "dotenv/config";
import { z } from "zod";

const toNumber = (value: unknown) => {
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
  }
  return value;
};

export const createProductSchema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters long"),
    sku: z.string().regex(/^[a-zA-Z0-9_-]+$/, "SKU must be alphanumeric and can include dashes or underscores").min(3, "SKU must be at least 3 characters long"),
    stockQuantity: z.preprocess(toNumber, z.number().int().nonnegative("Stock quantity cannot be negative")),
    price: z.preprocess(toNumber, z.number().positive("Price must be a positive number")),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;