import Image from "next/image";
import { useFormStatus } from "react-dom";

interface Props {
  formAction: (payload: FormData) => void;
  isDraft?: boolean;
  translate?: Record<"del", string | undefined>;
}

export default function DeleteButton({
  isDraft,
  formAction,
  translate,
}: Props) {
  const { pending } = useFormStatus();
  return (
    !isDraft && (
      <button
        className="note-editor-delete"
        disabled={pending}
        formAction={formAction}
        role="menuitem"
      >
        <Image
          src="/cross.svg"
          width={10}
          height={10}
          alt=""
          role="presentation"
        />
        {translate?.del}
      </button>
    )
  );
}
