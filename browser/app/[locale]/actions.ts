"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addNote, delNote, updateNote } from "~/lib/redis";
import { z } from "zod";
import { sleep } from "~/lib/utils";
import { format } from "date-fns";
import { stat, mkdir, writeFile } from 'fs/promises'
import { join } from "path";
import mime from "mime";

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, "请填写内容").max(100, "字数最多 100"),
});

interface State {
  message?: string | null;
  errors?: z.ZodIssue[];
}

export async function saveNote(
  prevState: State,
  formData: FormData
): Promise<State> {
  const noteId = formData.get("noteId");

  const data = {
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  };

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  // 为了让效果更明显
  await sleep(1000);

  if (noteId) {
    updateNote(noteId, JSON.stringify(data));
    revalidatePath("/", "layout");
  } else {
    const res = await addNote(JSON.stringify(data));
    revalidatePath("/", "layout");
  }
  return { message: `Add Success!` };
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

export async function importNote(formData: FormData) {
  const file = formData.get("file") as File;

  // 空值判断
  if (!file) {
    return { error: "File is required." };
  }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${format(new Date(), "yyyy-MM-dd")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e) {
    if ((e as { code: "ENOENT" | unknown }).code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      return { error: "Something went wrong." };
    }
  }

  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, "");
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(
      file.type
    )}`;
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    // 调用接口，写入数据库
    const res = await addNote(
      JSON.stringify({
        title: filename,
        content: buffer.toString("utf-8"),
        updateTime: new Date(),
      })
    );

    // 清除缓存
    revalidatePath("/", "layout");

    return { fileUrl: `${relativeUploadDir}/${uniqueFilename}`, uid: res };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong." };
  }
}
