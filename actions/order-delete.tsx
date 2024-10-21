"use server";

import { ORDER_URL } from "./constants";
import { DeleteOrderFormPrevState } from "./types";

export async function deleteOrder(
  _prevState: DeleteOrderFormPrevState,
  data: FormData
): Promise<DeleteOrderFormPrevState> {
  try {
    const orderId = data.get("orderId") as string;

    if (!orderId) {
      throw new Error();
    }

    const response = await fetch(`${ORDER_URL}/${orderId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error();
    }

    return {
      ok: true,
      message: "Order removed",
    };
  } catch (error: unknown) {
    return {
      ok: false,
      message: "An error occurred while deleting the order.",
    };
  }
}
