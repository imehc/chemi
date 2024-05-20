import NoteEditor from "~/components/note/edit";

export default async function EditPage() {
  return <NoteEditor noteId={null} initialTitle="Untitled" initialBody="" />
}
