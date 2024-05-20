import { getTranslations } from "next-intl/server";
import Note from "~/components/note";
import { getNote } from "~/lib/redis";
import { sleep } from "~/lib/utils";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  // 动态路由 获取笔记 id
  const noteId = params.id;
  const note = await getNote(noteId);
  const t = await getTranslations("Basic");

  // 为了让 Suspense 的效果更明显
  await sleep(500);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">{t("initText")}</span>
      </div>
    );
  }

  return <Note noteId={noteId} note={note} />;
}
