
import { getUserInfo } from "@/src/services/auth.serives"
import DashboardSidebarContent from "./DashboardSidebarContent"
import { NavSection } from "@/src/types/dashboard.types"
import { getNavItemsByRole } from "@/src/lib/navItem"
import { getDefaultDashboardRoute } from "@/src/lib/AuthUtils"

const DashboardSidebar = async () => {
  const userInfo = await getUserInfo()
  const navItems : NavSection[] = getNavItemsByRole(userInfo.role)

  const dashboardHome = getDefaultDashboardRoute(userInfo.role)
  return (
    <DashboardSidebarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome}/>
  )
}

export default DashboardSidebar