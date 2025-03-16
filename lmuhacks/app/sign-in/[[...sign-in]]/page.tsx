import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <Link href="/" className="absolute top-8 left-8">
        <h1 className="text-2xl inline-block">🔗</h1>
      </Link>
      <SignIn />
    </div>
  );
}
