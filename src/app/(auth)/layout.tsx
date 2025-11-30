export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // This centers the form card nicely on the screen
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {children}
    </div>
  );
}