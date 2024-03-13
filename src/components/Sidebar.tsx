"use client";
import Image from "next/image";


export default function Sidebar() {
  return (
   <div className="flex flex-col w-64 h-screen items-center p-4">
        <Image
            src="/freddys_logo.svg"
            alt="Freddy Logo"
            width={75}
            height={24}
            priority
          />
    </div>
  );
}