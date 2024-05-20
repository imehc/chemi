import { getTranslations } from "next-intl/server";
import NoteEditor from "~/components/note/edit";

export default async function EditPage() {
  const t = await getTranslations("Basic");

  return (
    <NoteEditor
      noteId={null}
      initialTitle="Untitled"
      initialBody=""
      translate={{
        del: t("del"),
        enterTitle: t("enterTitle"),
        enterBody: t("enterBody"),
        preview: t("preview"),
        saving: t("saving"),
        done: t("done"),
      }}
    />
  );
}
