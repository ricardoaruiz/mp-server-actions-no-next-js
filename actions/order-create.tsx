"use server";

import {
  FormFieldsValidationException,
  validateFormFields,
} from "@/helpers/form-validation";
import { BASE_URL, CREATE_ORDER_FORM_SCHEMA } from "./constants";
import { revalidateTag } from "next/cache";
import {
  OrderFormData,
  OrderFormFieldErrors,
  OrderFormPrevState,
} from "./types";

const ORDER_URL = `${BASE_URL}/orders`;

export async function orderCreate(
  _prevState: OrderFormPrevState,
  data: FormData
): Promise<OrderFormPrevState> {
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

    if (!response.ok) {
      throw new Error();
    }

    revalidateTag("orders");
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
