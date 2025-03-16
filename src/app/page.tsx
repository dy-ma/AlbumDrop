import LandingCard from "@/components/landing-card";
import { LandingNavMenu } from "@/components/nav-menu";
import { Button } from "@/components/ui/button";
import { ExternalLink, GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="flex w-full justify-between items-center p-2">
        <div className="flex items-center gap-2">
          <GalleryVerticalEnd className="w-6 h-6" />
          <span className="font-bold text-xl">AlbumDrop</span>
          <LandingNavMenu className="ml-10" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-col mt-10 w-full h-full">
        <div className="flex w-full justify-center">
          <LandingCard />
        </div>
        <div className="flex w-full justify-center">
          <Button>Get Started</Button>
          <Button variant="link" asChild>
            <Link href="https://www.dyma.dev/" target="_blank">
              Check out my other sites
              <ExternalLink />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
