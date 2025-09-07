import ListAllUsers from "@/components/auth/list-users"
import Header from "@/components/layout/header"
import MainLayout from "@/components/layout/layout"

const UserListPage = () => {
  return (
    <MainLayout>
      <Header Title ="Patient List"/>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <ListAllUsers/>
          </div>
      </div>   
    </MainLayout>
  )
}

export default UserListPage