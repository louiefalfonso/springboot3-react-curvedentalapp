import Header from "@/components/layout/header"
import MainLayout from "@/components/layout/layout"
import StaffLists from "@/components/staff/staff-lists"

const StaffListsPage = () => {
  return (
    <MainLayout>
      <Header Title ="Staff List"/>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
             <StaffLists/>
          </div>
      </div>   
    </MainLayout>
  )
}

export default StaffListsPage