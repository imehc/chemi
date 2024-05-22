import { useFormStatus } from "react-dom";
import Image from "next/image";

interface Props {
  formAction: (payload: FormData) => void;
  translate?: Record<"saving" | "done", string | undefined>;
}

export default function SaveButton({ formAction, translate }: Props) {
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
      {pending ? translate?.saving : translate?.done}
    </button>
  );
}
