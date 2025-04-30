import Header from "@/components/layout/header"
import MainLayout from "@/components/layout/layout"
import TreatmentLists from "@/components/treatments/treatment-lists"

const TreatmentListsPage = () => {
  return (
    <MainLayout>
      <Header Title ="Treatment Lists"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <TreatmentLists/>
        </div>
      </div>
    </MainLayout>  
  )
}

export default TreatmentListsPage