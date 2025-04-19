import { AppSidebar } from "../../components/home/Sidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger className="cursor-pointer absolute shadow-md bg-white ms-1" />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout;
