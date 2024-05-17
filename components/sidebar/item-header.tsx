import { format } from "date-fns";

interface Props {
  title: string;
  updateTime: string;
}

export default function SidebarNoteItemHeader({ title, updateTime }: Props) {
  return (
    <header className="sidebar-note-header">
      <strong>{title}</strong>
      <small>{format(updateTime, "yyyy-MM-dd hh:mm:ss")}</small>
    </header>
  );
}
