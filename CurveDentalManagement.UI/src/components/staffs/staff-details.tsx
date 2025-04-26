import { useParams, Link } from "react-router-dom";

import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetStaffById } from "@/services/staff-services";
import StaffDetailsList from "./list/list-staff";

const StaffDetails = () => {

  const { id } = useParams();
  const { data: staffData, isLoading:  isStaffLoading, error: staffError} = useGetStaffById(id || "");

  if (isStaffLoading) {
    return <div>Loading...</div>;
}

if (staffError) {
    console.error('Error details:', { staffError });
    return <div>Error loading data. Please check the console for more details.</div>;
}

if (!staffData) {
   return <div>No staff data found</div>;
}

  return (
    <MainLayout>
        <Header Title="Patient Details" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <StaffDetailsList staffData={staffData}/>
          <div className="flex">
                <Link to={`/staffs`}>
                    <Button className="bg-gray-500 hover:bg-gray-600">Back to Staff List</Button>
                </Link>
            </div>
        </div>
   </MainLayout>     
  )
}

export default StaffDetails