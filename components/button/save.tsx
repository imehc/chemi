import { useFormStatus } from "react-dom";
import Image from "next/image";

interface Props {
  formAction: (payload: FormData) => void;
}

export default function SaveButton({ formAction }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      <Image
        src="/checkmark.svg"
        width={14}
        height={10}
        alt=""
        role="presentation"
      />
      {pending ? "Saving" : "Done"}
    </button>
  );
}
