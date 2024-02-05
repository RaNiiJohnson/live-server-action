"use client";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import { SubmitButton } from "./SubmitButton";
import { addItemAction } from "./item.action";

export type ItemFormProps = {};

export const ItemForm = (props: ItemFormProps) => {
  const router = useRouter();
  const toast = useToast();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const result = await addItemAction(formData);

    if (result.error) {
      toast.toast({
        title: result.error,
      });
      return;
    }

    router.refresh();

    form.reset();
    form.focus();

    toast.toast({
      title: result.message,
    });
  };

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <Input name="name" placeholder="name" />
      <SubmitButton type="submit">Submit</SubmitButton>
    </form>
  );
};
