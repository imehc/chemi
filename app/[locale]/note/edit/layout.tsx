import { auth, signIn } from "~/auth";

export default async function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    await signIn();
  }

  return children;
}
