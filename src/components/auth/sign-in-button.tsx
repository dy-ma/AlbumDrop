import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { LogIn, SquareArrowOutUpRight } from "lucide-react";

export async function SignInButton() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Link
      href={session?.session ? "/dashboard" : "/sign-in"}
      className="flex justify-center"
    >
      <Button className="gap-x-2  justify-between" variant="default">
        {!session?.session ? (
          <LogIn />
        ) : (
          <SquareArrowOutUpRight />
        )
        }
        <span>{session?.session ? "Dashboard" : "Sign In"}</span>
      </Button >
    </Link >
  );
}

function checkOptimisticSession(headers: Headers) {
  const guessIsSignIn =
    headers.get("cookie")?.includes("better-auth.session") ||
    headers.get("cookie")?.includes("__Secure-better-auth.session-token");
  return !!guessIsSignIn;
}

export async function SignInFallback() {
  //to avoid flash of unauthenticated state
  const guessIsSignIn = checkOptimisticSession(await headers());
  return (
    <Link
      href={guessIsSignIn ? "/dashboard" : "/sign-in"}
      className="flex justify-center"
    >
      <Button className="gap-x-2 justify-between" variant="default">
        {!guessIsSignIn ? (
          <LogIn />
        ) : (
          <SquareArrowOutUpRight />
        )}
        <span>{guessIsSignIn ? "Dashboard" : "Sign In"}</span>
      </Button>
    </Link>
  );
}
