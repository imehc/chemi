"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import NotePreview from "./preview";
import { deleteNote, saveNote } from "~/app/[locale]/actions";
import DeleteButton from "../button/del";
import SaveButton from "../button/save";

const initialState = {
  message: null,
};

type I18nKey =
  | "del"
  | "enterTitle"
  | "enterBody"
  | "preview"
  | "saving"
  | "done";

interface Props {
  noteId: string | null;
  initialTitle: string;
  initialBody: string;
  translate?: Record<I18nKey, string>;
}

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody,
  translate,
}: Props) {
  const [saveState, saveFormAction] = useFormState(saveNote, initialState);
  const [delState, delFormAction] = useFormState(deleteNote, initialState);

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;

  useEffect(() => {
    if (saveState.errors) {
      // 处理错误
      console.log(saveState.errors);
    }
  }, [saveState]);

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          <input type="hidden" name="noteId" value={noteId as string} />
          <SaveButton
            formAction={saveFormAction}
            translate={{ saving: translate?.saving, done: translate?.done }}
          />
          <DeleteButton
            isDraft={isDraft}
            formAction={delFormAction}
            translate={{ del: translate?.del }}
          />
        </div>
        <div className="note-editor-menu">
          {saveState?.message}
          {saveState.errors && saveState.errors[0].message}
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          {translate?.enterTitle}
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          {translate?.enterBody}
        </label>
        <textarea
          name="body"
          value={body}
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          {translate?.preview}
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}
