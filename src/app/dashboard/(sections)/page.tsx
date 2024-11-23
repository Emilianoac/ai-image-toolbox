import { redirect } from "next/navigation"

export default function page() {

  redirect("/dashboard/remove-background");

  return (
    <div>Dashboard</div>
  )
}
