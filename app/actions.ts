"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addNote, delNote, updateNote } from "~/lib/redis";
import { z } from "zod";
import { sleep } from "~/lib/utils";

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100')
});

interface State {
  message?: string | null;
  errors?: z.ZodIssue[]
}

export async function saveNote(
  prevState: State,
  formData: FormData
): Promise<State> {
  const noteId = formData.get("noteId");

  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date()
  }

  // 校验数据
  const validated = schema.safeParse(data)
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    }
  }

  // 为了让效果更明显
  await sleep(1000)

  if (noteId) {
    updateNote(noteId, JSON.stringify(data));
    revalidatePath("/", "layout");
  } else {
    const res = await addNote(JSON.stringify(data));
    revalidatePath("/", "layout");
  }
  return { message: `Add Success!` }
}

export async function deleteNote(
  prevState: State,
  formData: FormData
): Promise<State> {
  const noteId = formData.get("noteId");

  delNote(noteId as string);
  revalidatePath("/", "layout");
  redirect("/");
}
