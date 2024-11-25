
import IconRemoveBackground from "@/components/icons/IconRemoveBackground";
import IconImageTo3D from "@/components/icons/IconImageTo3D";
import IconGenerateImage from "@/components/icons/IconGenerateImage";
import SidebarMenuItem from "./SidebarMenuItem";
import Styles from "./Sidebar.module.css";

export default function Sidebar() {

  const SidebarMenuItems = [
    {
      title: "Eliminar fondo",
      icon: IconRemoveBackground,
      href: "/dashboard/remove-background",
      enabled: true,
    },
    {
      title: "Generar imagen",
      icon: IconGenerateImage,
      href: "/dashboard/generate-image",
      enabled: true
    },
    {
      title: "Imagen a 3D",
      icon: IconImageTo3D,
      href: "/dashboard/image-to-3d",
      enabled: false
    },
  ];

  return (
    <aside className={`${Styles['dashboard-sidebar']}`}>
      <div className="container mx-auto">
        <ul className={`${Styles['dashboard-sidebar__menu']}`}>
          {SidebarMenuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem
                key={index}
                href={item.href}
                title={item.title}
                enabled={item.enabled}
              >
                <Icon width={28} height={28} />
              </SidebarMenuItem>
            );
          })}
        </ul>
      </div>
    </aside>
  )
}
