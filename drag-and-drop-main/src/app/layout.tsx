import '../css/globals.css'

export const metadata = {
  title: "Drag and Drop",
  description: "Drag and Drop Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
