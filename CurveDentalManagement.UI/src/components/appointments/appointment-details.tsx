import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetAppointmentById } from "@/services/appointment-services";
import AppointmentDetailsList from "./list/list-appointment";

import PatientListTable from "./list/list-patient";
import DoctorListTable from "./list/list-doctor";
const AppointmentDetails = () => {

  const { id } = useParams();
  const { data: appointmentData, isLoading: isAppointmentLoading, error: appointmentError } = useGetAppointmentById(id || "");

  // Filter appointment for the specific patient
  const patientAppointment = useMemo(() => {
    if(!appointmentData || !appointmentData.patient) return[];
    return appointmentData.patient;
  }, [appointmentData]);

  // Filter appointment for the specific doctor
  const doctorAppointment = useMemo(() => {
    if(!appointmentData || !appointmentData.doctor) return[];
    return appointmentData.doctor;
  }, [appointmentData])


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
         <PatientListTable patientData={patientAppointment}/>
         <DoctorListTable doctorData={doctorAppointment}/>
         <Link to={`/appointments`}>
          <Button className="bg-gray-600 hover:bg-gray-700">Back to Appointment List</Button>
        </Link>
      </div>
   </MainLayout>   
  )
}

export default AppointmentDetails