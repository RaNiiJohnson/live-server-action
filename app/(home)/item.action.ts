"use server";

import { prisma } from "@/lib/prisma";

//2nd method : fichier séparé
export const addItemAction = async (formData: FormData) => {
  const name = formData.get("name") as string;

  if (!name) {
    return {
      error: "name is required",
    };
  }

  await prisma.task.create({
    data: {
      name,
    },
  });

  return {
    message: "Item added successfully",
  };
};

export const deleteItemAction = async (itemId: string) => {
  if (typeof itemId !== "string") {
    throw new Error("itemId must be a string");
  }

  await prisma.task.delete({
    where: {
      id: itemId,
    },
  });

  return {
    message: "Item deleted successfully",
  };
};

export const toggleItemAction = async (itemId: string) => {
  const item = await prisma.task.findUnique({
    where: {
      id: itemId,
    },
  });

  if (!item) {
    return {
      error: "item not found",
    };
  }

  await prisma.task.update({
    where: {
      id: itemId,
    },
    data: {
      done: !item.done,
    },
  });

  return {
    message: "Item toggled successfully ",
  };
};
