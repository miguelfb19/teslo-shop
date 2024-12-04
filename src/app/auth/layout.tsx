export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-4/5 px-10 flex justify-center">{children}</div>
    </main>
  );
}
