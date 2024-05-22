import { sleep } from "~/lib/utils";
import SidebarNoteListFilter from "./list-filter";
import { getAllNotes } from "~/lib/redis";
import SidebarNoteItemHeader from "./item-header";
import { getTranslations } from "next-intl/server";

export default async function NoteList() {
  await sleep(1000);
  const notes = await getAllNotes();
  const t = await getTranslations("Basic");

  if (Object.entries(notes).length == 0) {
    return <div className="notes-empty">{t("noCreate")}</div>;
  }
  return (
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
      translate={{ openPreview: t("openPreview"), noContent: t("noContent") }}
    />
  );
}
