import React from 'react'
import { Work_Sans, DM_Serif_Display } from 'next/font/google'
 


import "./global.css";
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const workSans = Work_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: ['400'] })
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={dmSerif.className + workSans.className} >

      <body>

        <main>
          
          
          {children}</main>
      </body>
    </html>
  )
}
