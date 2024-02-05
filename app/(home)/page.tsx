import { prisma } from "@/lib/prisma";
import { Item } from "./Item";
import { ItemForm } from "./ItemForm";

export default async function Home() {
  const items = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <ItemForm />
      <ul className="flex flex-col gap-4 mt-4">
        {items.length === 0 ? (
          <p>No task</p>
        ) : (
          items.map((item) => <Item key={item.id} item={item} />)
        )}
      </ul>
    </div>
  );
}
