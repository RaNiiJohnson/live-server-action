import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Check, Trash2, X } from "lucide-react";
import { revalidatePath } from "next/cache";
import { SubmitButton } from "./SubmitButton";

export default async function Home() {
  const items = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  //1st method : fonction séparée
  const addItemAction = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;

    await prisma.task.create({
      data: {
        name,
      },
    });

    revalidatePath("/");
  };
  return (
    <div>
      <form className="flex gap-2" action={addItemAction}>
        <Input name="name" placeholder="name" />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
      <ul className="flex flex-col gap-4 mt-4">
        {items.length === 0 ? (
          <p>No task</p>
        ) : (
          items.map((item) => (
            <form
              key={item.id}
              className="flex items-center px-3 py-2 border-2 border-gray-500 border-dashed rounded border-spacing-1"
            >
              <p
                className={cn("text-lg font-bold mr-auto", {
                  "line-through": item.done,
                })}
              >
                {item.name}
              </p>

              {/*  : formAction dans form */}
              <button
                formAction={async () => {
                  "use server";

                  // en gle, on doit verifier que l'utilisateur a le droit de faire cette action qu'on va pas faire ici

                  await prisma.task.update({
                    where: {
                      id: item.id,
                    },
                    data: {
                      done: !item.done,
                    },
                  });

                  revalidatePath("/");
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
                  "use server";

                  await prisma.task.delete({
                    where: {
                      id: item.id,
                    },
                  });

                  revalidatePath("/");
                }}
                className="px-2 rounded hover:bg-accent"
              >
                <Trash2 className="text-amber-200" />
              </button>
            </form>
          ))
        )}
      </ul>
    </div>
  );
}
