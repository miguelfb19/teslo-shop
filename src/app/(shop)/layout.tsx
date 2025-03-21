import { Footer } from "@/components/ui/footer/Footer";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";

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
