import LoginForm from "@/components/ui/LoginForm";
import Image from "next/image";


export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[300px] flex-col space-y-2.5 p-4 md:-mt-32 rounded-lg border-2 border-orange-800">
        <div className="flex w-full  p-3 md:h-18 justify-between">
          <div className=" text-white md:w-36">
            Freddy's Artisanal Hallowen Candy Shop
          </div>
          <Image
            src="/freddys_logo.svg"
            alt="Freddy Logo"
            width={75}
            height={24}
            priority
          />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}