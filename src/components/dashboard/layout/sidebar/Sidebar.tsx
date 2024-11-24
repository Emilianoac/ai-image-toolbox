
import IconRemoveBackground from "@/components/icons/IconRemoveBackground";
import IconImageTo3D from "@/components/icons/IconImageTo3D";
import IconGenerateImage from "@/components/icons/IconGenerateImage";
import SidebarMenuItem from "./SidebarMenuItem";

export default function Sidebar() {

  const SidebarMenuItems = [
    {
      title: "Eliminar fondo",
      icon: IconRemoveBackground,
      href: "/dashboard/remove-background",
      enabled: true,
    },
    {
      title: "Imagen a 3D",
      icon: IconImageTo3D,
      href: "/dashboard/image-to-3d",
      enabled: false
    },
    {
      title: "Generar imagen",
      icon: IconGenerateImage,
      href: "/dashboard/generate-image",
      enabled: false
    }
  ];

  return (
    <aside
      className="
        bg-app-light-100 dark:bg-app-dark-200 
        border-r border-app-light-300 dark:border-app-dark-100
        h-full py-10
      "
    >
      <ul>
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
    </aside>
  )
}
