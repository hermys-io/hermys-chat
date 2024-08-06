"use client";
import { useTheme } from "@/lib/theme-provider";
import { useGetSignedFile } from "@/services/helpers/query";
import { SunMoonIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MenuHeaderProps {
  clerkPhotoLight?: string | null;
  clerkPhotoDark?: string | null;
}

export default function MenuHeader(props: MenuHeaderProps) {
  const { clerkPhotoLight, clerkPhotoDark } = props;

  const { toggleTheme, currentTheme } = useTheme();

  const imageFileLightQuery = useGetSignedFile({
    filename: clerkPhotoLight ? clerkPhotoLight : undefined,
  });
  const imageFileDarkQuery = useGetSignedFile({
    filename: clerkPhotoDark ? clerkPhotoDark : undefined,
  });

  return (
    <div className="flex min-h-[72px] items-center justify-between border-t-[1px] border-border bg-background px-6">
      <Link href="/">
        <div className="relative max-h-[40px] min-h-[40px] min-w-[275px] max-w-[275px]">
          {currentTheme == "light" && imageFileLightQuery.data ? (
            <Image
              className="!important h-[40px] w-auto"
              layout="fill"
              objectFit=""
              src={imageFileLightQuery.data}
              alt="clerk image"
            />
          ) : null}
          {currentTheme == "dark" && imageFileDarkQuery.data ? (
            <Image
              className="!important h-[40px] w-auto"
              layout="fill"
              objectFit=""
              src={imageFileDarkQuery.data}
              alt="clerk image"
            />
          ) : null}
        </div>
      </Link>

      <button onClick={toggleTheme} className="text-primary lg:hidden">
        <SunMoonIcon />
      </button>
    </div>
  );
}
