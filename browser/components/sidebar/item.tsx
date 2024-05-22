import SidebarNoteItemContent from "./item-content";
import SidebarNoteItemHeader from "./item-header";

interface Props {
  noteId: string;
  note: {
    title: string;
    content?: string;
    updateTime: string;
  };
}

export default function SidebarNoteItem({
  noteId,
  note: { content = "", ...attr },
}: Props) {
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={attr.title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <SidebarNoteItemHeader {...attr} />
    </SidebarNoteItemContent>
  );
}
