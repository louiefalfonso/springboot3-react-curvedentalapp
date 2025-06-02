import { useParams, Link } from "react-router-dom";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";
import { useGetAppointmentById } from "@/services/appointment-services";
import AppointmentDetailsList from "./list/list-appointment";
const AppointmentDetails = () => {

  const { id } = useParams();
  const { data: appointmentData, isLoading: isAppointmentLoading, error: appointmentError } = useGetAppointmentById(id || "");

  if (isAppointmentLoading) {
    return <div>Loading...</div>;
  }

  if (appointmentError) {
    console.error('Error details:', { appointmentError });
    return <div>Error loading data. Please check the console for more details.</div>;
  }

  if (!appointmentData) {
    return <div>No Appointment Data Found</div>;
  }
  return (
    <MainLayout>
      <Header Title="Appointment Details" />
      <div className="flex flex-1 flex-col gap-4 p-4">
         <AppointmentDetailsList appointmentData={appointmentData}/>
         <Link to={`/appointments`}>
          <Button className="bg-gray-600 hover:bg-gray-700">Back to Appointment List</Button>
        </Link>
      </div>
   </MainLayout>   
  )
}

export default AppointmentDetails