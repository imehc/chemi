"use client";

import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { importNote } from "~/app/[locale]/actions";

export default function SidebarImport() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null);
  // 随机使用api或github actions两种上传方式
  const isUseActions = useRef(Math.random() > 0.5);

  console.log("isUseActions: ", isUseActions);

  // const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const fileInput = e.target;

  //   if (!fileInput.files || fileInput.files.length === 0) {
  //     console.warn("files list is empty");
  //     return;
  //   }

  //   const file = fileInput.files[0];

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   if (isUseActions) {
  //     // 使用Server Actions
  //     try {
  //       const data = await importNote(formData);
  //       router.push(`/note/${data.uid}`);
  //     } catch (error) {
  //       console.error("something went wrong");
  //     }
  //   } else {
  //     // 使用API接口
  //     try {
  //       const response = await fetch("/api/upload", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (!response.ok) {
  //         console.error("something went wrong");
  //         return;
  //       }

  //       const data = await response.json();
  //       startTransition(() => router.push(`/note/${data.uid}`));
  //       startTransition(() => router.refresh());
  //     } catch (error) {
  //       console.error("something went wrong");
  //     }
  //   }

  //   // 重置 file input
  //   e.target.type = "text";
  //   e.target.type = "file";
  // };

  async function upload(formData: FormData) {
    const file = formData.get("file");
    if (!file) {
      console.warn("files list is empty");
      return;
    }
    if (isUseActions.current) {
      try {
        const data = await importNote(formData);
        router.push(`/note/${data.uid}`);
      } catch (error) {
        console.error("something went wrong");
      }
    } else {
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          // 启用fetch内置超时,这里是两秒超时
          signal: AbortSignal.timeout(2000)
        });

        if (!response.ok) {
          console.error("something went wrong");
          return;
        }

        const data = await response.json();
        startTransition(() => router.push(`/note/${data.uid}`));
        startTransition(() => router.refresh());
      } catch (error) {
        console.error("something went wrong: ", error);
      }
    }

    // 重置 file input
    formRef.current?.reset();
  }

  return (
    <form style={{ textAlign: "center" }} action={upload} ref={formRef}>
      <label htmlFor="file" style={{ cursor: "pointer" }}>
        Import .md File
      </label>
      <input type="file" id="file" name="file" accept=".md" disabled={isPending} />
      <div>
        <Submit />
      </div>
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>{pending ? "Submitting" : "Submit"}</button>
  );
}
