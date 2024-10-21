"use server";

import {
  FormFieldsValidationException,
  validateFormFields,
} from "@/helpers/form-validation";
import { CREATE_ORDER_FORM_SCHEMA, ORDER_URL } from "./constants";
import {
  OrderFormData,
  OrderFormFieldErrors,
  CreateOrderFormPrevState,
} from "./types";
import { revalidateTag } from "next/cache";

export async function orderCreate(
  _prevState: CreateOrderFormPrevState,
  data: FormData
): Promise<CreateOrderFormPrevState> {
  try {
    const {
      customer_name,
      customer_email,
      order_date,
      amount_in_cents,
      status,
    } = validateFormFields<OrderFormData, OrderFormFieldErrors>(
      data,
      CREATE_ORDER_FORM_SCHEMA
    );

    const order = JSON.stringify({
      customer_name,
      customer_email,
      order_date,
      amount_in_cents: +amount_in_cents * 100,
      status,
    });

    const response = await fetch(ORDER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: order,
    });

    revalidateTag("orders");

    if (!response.ok) {
      throw new Error();
    }

    return {
      ok: true,
      message: "Order created",
    };
  } catch (error: unknown) {
    if (error instanceof FormFieldsValidationException) {
      return {
        ok: false,
        errors: error.errors,
      };
    }
    return {
      ok: false,
      message: "An error occurred while order creation.",
    };
  }
}
