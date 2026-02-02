// Root layout - redirects are handled by middleware
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
