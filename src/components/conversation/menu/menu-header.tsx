"use client";
import { useTheme } from "@/lib/theme-provider";
import { SunMoonIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MenuHeader() {
  const { toggleTheme } = useTheme();

  return (
    <div className="flex h-16 items-center justify-between bg-background px-6">
      <Link href="/">
        <img src="https://i.imgur.com/mKylnEf.png" alt="a" />
      </Link>

      <button onClick={toggleTheme} className="text-primary">
        <SunMoonIcon />
      </button>
    </div>
  );
}
