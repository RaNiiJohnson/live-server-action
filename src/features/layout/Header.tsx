import { ThemeToggle } from "@/src/theme/ThemeToggle";

export const Header = async () => {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-b-accent bg-background">
      <div className="flex items-center max-w-lg gap-1 py-2 m-auto">
        <h2 className="mr-auto text-2xl font-bold">live-SA</h2>
        <ThemeToggle />
      </div>
    </header>
  );
};
