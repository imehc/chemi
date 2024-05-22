import { type PropsWithChildren } from "react";
import Sidebar from "~/components/sidebar";
import { Footer } from "~/components/footer";
import Header from "~/components/header";
import "./style.css";

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Header />
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
