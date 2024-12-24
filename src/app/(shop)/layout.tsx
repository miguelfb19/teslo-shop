import { Sidebar, TopMenu } from "@/components";
import { Footer } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="min-h-screen">
        <TopMenu />
        <Sidebar />
        <div className="sm:px-10">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
