import Header from "@/components/layout/header"
import MainLayout from "@/components/layout/layout"
import PatientLists from "@/components/patients/patient-lists"

const PatientListsPage = () => {
  return (
    <MainLayout>
      <Header Title ="Patient List"/>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <PatientLists/>
          </div>
      </div>   
    </MainLayout>
  )
}

export default PatientListsPage