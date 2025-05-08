import AppointmentLists from "@/components/appointments/appointment-lists"
import Header from "@/components/layout/header"
import MainLayout from "@/components/layout/layout"

const AppointmentListsPage = () => {
  return (
    <MainLayout>
      <Header Title ="Appointment Lists"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
           <AppointmentLists/>
          </div>
      </div>    
   </MainLayout>   
  )
}

export default AppointmentListsPage