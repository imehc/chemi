"use client";

import { useSearchParams } from "next/navigation";
import SidebarNoteItemContent from "./item-content";

interface Props<T> {
  notes: T[];
  translate?: Record<"openPreview" | "noContent", string>;
}

interface Item {
  noteId: string;
  note: {
    title: string;
    content: string;
  };
  header: React.ReactNode;
}

export default function SidebarNoteListFilter<T extends Item>({
  notes,
  translate,
}: Props<T>) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul className="notes-list">
      {notes.map((noteItem) => {
        const { noteId, note, header } = noteItem;
        if (
          !searchText ||
          (searchText &&
            note.title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return (
            <SidebarNoteItemContent
              key={noteId}
              id={noteId}
              title={note.title}
              expandedChildren={
                <p className="sidebar-note-excerpt">
                  {note.content.substring(0, 20) || (
                    <i>({translate?.noContent})</i>
                  )}
                </p>
              }
              translate={{ openPreview: translate?.openPreview }}
            >
              {header}
            </SidebarNoteItemContent>
          );
        }

        return null;
      })}
    </ul>
  );
}
