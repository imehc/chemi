import Image from "next/image";
import { useFormStatus } from "react-dom";

interface Props {
  formAction: (payload: FormData) => void;
  isDraft?: boolean;
}

export default function DeleteButton({ isDraft, formAction }: Props) {
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
        Delete
      </button>
    )
  );
}
