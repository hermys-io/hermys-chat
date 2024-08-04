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

  const currentImage =
    currentTheme == "light"
      ? imageFileLightQuery.data
      : imageFileDarkQuery.data;

  return (
    <div className="flex min-h-[72px] items-center justify-between border-t-[1px] border-border bg-background px-6">
      <Link href="/">
        <div className="relative max-h-[40px] min-h-[40px] min-w-[275px] max-w-[275px]">
          {imageFileLightQuery.data || imageFileDarkQuery.data ? (
            <Image
              className="!important h-[40px] w-auto"
              layout="fill"
              objectFit=""
              src={
                currentTheme == "light"
                  ? (imageFileLightQuery.data as string)
                  : (imageFileDarkQuery.data as string)
              }
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
