import DesktopHeader from "./desktop-header";
import BottomNav from "./bottom-nav";

/**
 * Shell aplikasi: header sticky (desktop) + bottom-nav native (mobile).
 * Konten utama diberi padding bawah agar tidak tertutup bottom-nav di HP.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DesktopHeader />
      <div className="flex min-h-screen flex-col pb-24 lg:pb-0">{children}</div>
      <BottomNav />
    </>
  );
}
