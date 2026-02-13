import { caller } from "@/trpc/server";
import Image from "next/image";

const HomePage = async () => {
  return (
    <div className="flex items-center justify-center w-full h-full p-4 md:p-0">
      <Image
        alt="Logo"
        height="753"
        width="700"
        className="mx-auto w-auto rounded-full"
        src="/images/default.jpg"        
      />
    </div>
  );
};

export default HomePage;
