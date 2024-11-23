import GridPattern from "@/components/dashboard/layout/main/GridPattern";
import Sidebar from "@/components/dashboard/layout/sidebar/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({  children }: Readonly<DashboardLayoutProps>) {

  return (
    <div className="grid grid-cols-[_50px_1fr] h-[calc(100vh-50px)]">
      <Sidebar/>
      <main className="flex flex-col items-center justify-center relative overflow-hidden">
        <GridPattern className="absolute top-0"/>
        <div className="relative z-10 w-full h-full flex justify-center items-center">
          <div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
