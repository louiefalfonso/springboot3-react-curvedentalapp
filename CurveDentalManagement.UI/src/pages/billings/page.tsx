import Header from "@/components/layout/header"
import MainLayout from "@/components/layout/layout"

const BillingsPage = () => {
  return (
    <MainLayout>
      <Header Title ="Doctor Lists"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            Billings Page
          </div>
      </div>    
   </MainLayout>  
  )
}

export default BillingsPage