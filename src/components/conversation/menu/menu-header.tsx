import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default function MenuHeader() {
  return (
    <div className="hidden h-16 items-center justify-between bg-background px-6 lg:flex">
      <Link href="/">
        <img src="https://i.imgur.com/mKylnEf.png" alt="aa" />
      </Link>

      <button>
        <MenuIcon />
      </button>
    </div>
  );
}
