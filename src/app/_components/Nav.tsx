"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="absolute top-2 right-2 z-10 flex flex-row gap-1 rounded-full border bg-transparent p-1 shadow-2xl backdrop-blur-3xl">
      <Link href="/">
        <Button
          variant={pathname === "/editor" ? "ghost" : "default"}
          className="rounded-full transition-all"
        >
          Home
        </Button>
      </Link>
      <Link href="/editor">
        <Button
          variant={pathname !== "/editor" ? "ghost" : "default"}
          className="rounded-full transition-all"
        >
          Editor
        </Button>
      </Link>
    </div>
  );
}
