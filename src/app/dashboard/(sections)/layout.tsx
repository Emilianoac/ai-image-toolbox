
import GridPattern from "@/components/dashboard/layout/main/GridPattern";
import Sidebar from "@/components/dashboard/layout/sidebar/Sidebar";
import Styles from "./layout.module.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({  children }: Readonly<DashboardLayoutProps>) {

  return (
    <div className={`${Styles['dashboard-layout']}`}>
      <Sidebar/>
      <main className={`${Styles['dashboard__main-container']}`}>
        <GridPattern className="absolute top-0 left-0"/>
        <div className={`${Styles['dashboard__main-content']}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
