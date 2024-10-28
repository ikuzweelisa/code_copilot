import NavContent from "./nav-content";

export default function DesktopNavbar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-80 hidden md:flex flex-col bg-background border-r">
      <NavContent />
    </aside>
  );
}
