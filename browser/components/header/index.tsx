import { BuiltInProviderType } from "next-auth/providers";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { signIn, signOut, auth } from "~/auth";

interface SignInProps extends HTMLAttributes<HTMLButtonElement> {
  provider?: BuiltInProviderType | (string & {});
}

function SignIn({ provider, ...props }: SignInProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  );
}

interface SignOutProps extends HTMLAttributes<HTMLButtonElement> {}

function SignOut(props: SignOutProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button {...props}>Sign Out</button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();
  return (
    <header style={{ display: "flex", justifyContent: "space-around" }}>
      <Link href="/client">Client Side Component</Link>
      {session?.user ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          {session?.user.name}
          <SignOut />
        </span>
      ) : (
        <SignIn />
      )}
    </header>
  );
}
