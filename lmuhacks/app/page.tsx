import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen max-w-[1440px] mx-auto font-[family-name:var(--font-outfit)]">
      <nav className="flex justify-between items-end w-full px-10 py-4">
        <Link href="/">
          <h1 className="text-2xl inline-block">
            🔗{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lmu-crimson to-lmu-blue">
              LMU
            </span>
          </h1>
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </nav>
      <main className="relative flex flex-col gap-2 items-center justify-center w-full h-full px-8 pb-4">
        <div className="flex flex-col gap-2 items-center justify-center bg-gray-50 rounded-3xl w-full h-full p-8">
          <div className="font-bold text-center text-3xl max-w-[500px] px-8">
            🔗 Link
          </div>
          <div className="text-center text-gray-500 text-md max-w-[440px] px-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lmu-blue to-lmu-crimson">
              loyola marymount university
            </span>{" "}
            🦁
          </div>
          <SignedIn>
            <Link href="/link">
              <Button variant="outline" className="rounded-full mt-2">
                Start linking 🔗
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="rounded-full mt-2">
                Sign in to start linking 🔗
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </main>
      <footer className="text-sm text-center text-gray-500 pb-4">
        Made with ❤️ by Dawit, Davis, and Brandon for{" "}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lmu-blue to-lmu-crimson">
          LMUHacks 2025
        </span>
      </footer>
    </div>
  );
}
