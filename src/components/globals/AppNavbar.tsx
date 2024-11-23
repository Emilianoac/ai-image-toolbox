import AppLogo from "./AppLogo";
import AppThemeToggle from "./AppThemeToggle";

export default function AppNavbar() {
  return (
    <nav 
      className="
        bg-app-light-100 dark:bg-app-dark-200 
        border-b border-app-light-300 dark:border-app-dark-100
        h-[50px] flex items-center px-4
      ">
        <div className="flex justify-between w-full mx-auto">
          <AppLogo className="max-w-[210px]"/>
          <div>
            <AppThemeToggle/>
          </div>
        </div>
    </nav>
  )
}
