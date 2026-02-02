// import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full max-w-md space-y-2 text-left">
          <label
            htmlFor="message"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Quick note
          </label>
          <Textarea
            id="message"
            placeholder="Share what's on your mind..."
            className="min-h-24"
          />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            This is just a UI example.
          </p>
          <div className="pt-2">
            <Button type="button">Send message</Button>
          </div>
        </div>       
      </main>
    </div>
  );
}
