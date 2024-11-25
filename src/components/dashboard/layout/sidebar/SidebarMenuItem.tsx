"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  title: string;
  href: string;
  enabled: boolean;
  children: React.ReactNode;
}

export default function SidebarMenuItem({href, title, children, enabled, ...props} : SidebarMenuItemProps) {
  const pathname = usePathname();

  return (
    <li 
      className={`
        border-r-4 
        ${!enabled ? "cursor-not-allowed opacity-10" : "cursor-pointer hover:opacity-100"}
        ${pathname === href ? "border-app-primary" : "border-transparent opacity-40"}
        mb-4 last-of-type:mb-0
      `}
      {...props}
      >
      {
        enabled ? (
          <Link
            href={href}
            title={title}
            className="flex items-center justify-center"
          >
            {children}
          </Link>
        ) : (
          <div 
            title={title}
            className="flex items-center justify-center">
            {children}
          </div>
        )
      }
  </li>
  )
}
