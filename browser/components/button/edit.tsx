import Link from "next/link";
import { PropsWithChildren } from "react";

interface Props {
  noteId: string | null;
}

export default function EditButton({
  noteId,
  children,
}: PropsWithChildren<Props>) {
  const isDraft = noteId == null;
  return (
    <Link href={`/note/edit/${noteId || ""}`} className="link--unstyled">
      <button
        className={[
          "edit-button",
          isDraft ? "edit-button--solid" : "edit-button--outline",
        ].join(" ")}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  );
}
