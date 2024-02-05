"use client";

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Check, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteItemAction, toggleItemAction } from "./item.action";

export type ItemProps = {
  item: {
    id: string;
    name: string;
    done: boolean;
  };
};

export const Item = ({ item }: ItemProps) => {
  const router = useRouter();
  const toast = useToast();
  return (
    <form
      key={item.id}
      className="flex items-center px-3 py-2 border-2 border-gray-500 rounded bord er-dashed border-spacing-1"
    >
      <p
        className={cn("text-lg font-bold mr-auto", {
          "line-through": item.done,
        })}
      >
        {item.name}
      </p>

      {/* 2nd method : formAction dans form */}
      <button
        formAction={async () => {
          const result = await toggleItemAction(item.id);

          if (result.error) {
            toast.toast({
              title: result.error,
            });
            return;
          }

          router.refresh();
        }}
        className="px-2 rounded hover:bg-accent"
      >
        {item.done ? (
          <Check className="font-bold text-green-600" />
        ) : (
          <X className="font-bold text-red-600" />
        )}
      </button>
      <button
        formAction={async () => {
          await deleteItemAction(item.id);
          router.refresh();
        }}
        className="px-2 rounded hover:bg-accent"
      >
        <Trash2 className="text-amber-200" />
      </button>
    </form>
  );
};
