import { useParams, Link } from "react-router-dom";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetDoctorById } from "@/services/doctor-services";
import DoctorDetailsList from "./list/list-doctor";

const DoctorDetails = () => {

  const { id } = useParams();
  const { data: doctorData, isLoading:  isDoctorLoading, error: doctorError} = useGetDoctorById(id || "");

  if (isDoctorLoading) {
    return <div>Loading...</div>;
  }

  if (doctorError) {
    console.error('Error details:', { doctorError });
    return <div>Error loading data. Please check the console for more details.</div>;
  }

  if (!doctorData) {
    return <div>No doctor data found</div>;
 }

  return (
    <MainLayout>
        <Header Title="Doctor Details" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <DoctorDetailsList doctorData={doctorData}/>
          <div className="flex">
            <Link to={`/doctors`}>
                <Button className="bg-gray-500 hover:bg-gray-600">Back to Doctors List</Button>
              </Link>
          </div>   
        </div>
    </MainLayout>    
  )
}

export default DoctorDetails