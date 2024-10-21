"use client";

import { useFormState } from "react-dom";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { DeleteOrderFormPrevState } from "@/actions/types";
import { deleteOrder } from "@/actions/order-delete";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { revalidateTagClient } from "@/actions/revalidate";

const prevState: DeleteOrderFormPrevState = {};

type DeleteButtonProps = {
  orderId: number;
};

export default function DeleteButton({ orderId }: DeleteButtonProps) {
  const [state, action] = useFormState(deleteOrder, prevState);

  useEffect(() => {
    if (state.ok === undefined) return;

    if (state.ok) {
      toast.success("Pedido removido com sucesso");
      revalidateTagClient("orders");
    }

    if (!state.ok) {
      toast.error("Problema ao remover o pedido");
    }
  }, [state.message, state.ok]);

  return (
    <form action={action} noValidate>
      <input type="hidden" name="orderId" value={orderId} />
      <Button variant="ghost" className="">
        <Trash className="w-4 text-red-500" />
      </Button>
    </form>
  );
}
