import {type PropsWithChildren } from 'react'
import Sidebar from '~/components/sidebar'
import './style.css'


export default async function RootLayout({
  children
}: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  )
}

