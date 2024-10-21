import { z } from "zod";

const BASE_URL= 'https://apis.codante.io/api/orders-api'
export const ORDER_URL = `${BASE_URL}/orders`;

export const CREATE_ORDER_FORM_SCHEMA = z.object({
  customer_name: z.string().min(1, "Required field"),
  customer_email: z.string().min(1, "Required field").email("Invalid email"),
  order_date: z.string().min(1, "Required field").date(),
  amount_in_cents: z.coerce
    .string()
    .min(1, "Required field")
    .regex(/^\d+(,\d{0,2})?$/, "Invalid amount")
    .transform((val) => parseFloat(val.replace(/\./g, "").replace(",", ".")))
    .refine((value) => value > 0, { message: "Must be greater than 0" }),
  status: z.string().min(1, "Required field"),
});