"use client";
import { useTheme } from "@/lib/theme-provider";
import { SunMoonIcon } from "lucide-react";
import Link from "next/link";

interface MenuHeaderProps {
  clerkPhoto?: string | null;
}

export default function MenuHeader(props: MenuHeaderProps) {
  const { clerkPhoto } = props;

  const { toggleTheme } = useTheme();

  return (
    <div className="flex min-h-16 items-center justify-between border-t-[1px] border-border bg-background px-6">
      <Link href="/">
        {clerkPhoto ? (
          <img src="https://i.imgur.com/mKylnEf.png" alt="a" />
        ) : null}
      </Link>

      <button onClick={toggleTheme} className="text-primary lg:hidden">
        <SunMoonIcon />
      </button>
    </div>
  );
}
