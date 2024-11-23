import Sidebar from "@/components/dashboard/layout/sidebar/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({  children }: Readonly<DashboardLayoutProps>) {

  return (
    <div className="grid grid-cols-[_50px_1fr] h-[calc(100vh-50px)]">
      <Sidebar/>
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
