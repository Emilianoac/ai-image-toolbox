"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "react-tooltip"
import Styles from "./Sidebar.module.css";

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  title: string;
  href: string;
  enabled: boolean;
  children: React.ReactNode;
}

export default function SidebarMenuItem({href, title, children, enabled, ...props} : SidebarMenuItemProps) {
  const pathname = usePathname();

  return (
    <>
    <li 
      data-tooltip-id="my-tooltip" 
      data-tooltip-content={title}
    
      className={`
        ${Styles["dashboard-sidebar__menu-item"]}
        ${!enabled && Styles.disabled}
        ${pathname === href && Styles.active}
      `}
      {...props}
      >
      {
        enabled ? (
          <Link
            href={href}
            className="flex items-center justify-center"
          >
            <div className="flex justify-center flex-col items-center">  
              {children}
              <span className="lg:hidden text-xs mt-1 text-center line-clamp-1">
                {title}
              </span>
            </div>
          </Link>
        ) : (
          <div 
            title={title}
            className="flex items-center justify-center">
              <div className="flex justify-center flex-col items-center">  
                {children}
                <span className="lg:hidden text-xs mt-1 text-center line-clamp-1">
                  {title}
                </span>
              </div>
          </div>
        )
      }
    </li>
    <Tooltip id="my-tooltip" place="right" />
  </>
  )
}
