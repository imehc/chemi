import { format } from "date-fns";
import EditButton from "../button/edit";
import NotePreview from "./preview";
import { useTranslations } from "next-intl";

interface Props {
  noteId: string;
  note: {
    title: string;
    content?: string;
    updateTime: string;
  };
}

export default function Note({ noteId, note }: Props) {
  const { title, content, updateTime } = note;
  const t = useTranslations('Basic');

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            {t('lastUpdatedOn')} {format(updateTime, "yyyy-MM-dd hh:mm:ss")}
          </small>
          <EditButton noteId={noteId}>{t('edit')}</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}
