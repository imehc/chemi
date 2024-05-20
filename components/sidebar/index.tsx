import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarNoteList from "./list";
import EditButton from "../button/edit";
import NoteListSkeleton from "./skeleton";
import SidebarSearchField from "./search";
import { useTranslations } from "next-intl";
import SidebarImport from "./import";

export default function Sidebar() {
  const t = useTranslations("Basic");

  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <Image
              className="logo"
              src="/logo.svg"
              width={22}
              height={20}
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField
            translate={{ search: t("search"), searchTitle: t("searchTitle") }}
          />
          <EditButton noteId={null}>{t("new")}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
        <SidebarImport />
      </section>
    </>
  );
}
