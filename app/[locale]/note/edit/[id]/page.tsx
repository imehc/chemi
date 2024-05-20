import { getTranslations } from "next-intl/server";
import NoteEditor from "~/components/note/edit";
import { getNote } from "~/lib/redis";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPage({ params }: Props) {
  const noteId = params.id;
  const note = await getNote(noteId);
  const t = await getTranslations("Basic");

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">{t("initText")}</span>
      </div>
    );
  }

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={note.content}
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
