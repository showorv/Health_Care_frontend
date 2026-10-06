
import { getUserInfo } from "@/src/services/auth.serives"
import DashboardNavbarContent from "./DashboardNavbarContent"
import { getNavItemsByRole } from "@/src/lib/navItem"
import { NavSection } from "@/src/types/dashboard.types"
import { getDefaultDashboardRoute } from "@/src/lib/AuthUtils"

const DashboardNavbar = async () => {
   const userInfo = await getUserInfo()
    const navItems : NavSection[] = getNavItemsByRole(userInfo.role)
  
    const dashboardHome = getDefaultDashboardRoute(userInfo.role)
  return (
    <DashboardNavbarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome}/>
  )
}

export default DashboardNavbar