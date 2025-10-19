import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";
import { useGetAllAppointments } from "@/services/appointment-services";
import { useGetPatientById } from "@/services/patient-services";
import PatientDetailsList from "./list/list-patient";
import PatientAppointment from "./list/list-appointment";

const PatientDetails = () => {

    const { id } = useParams();
    const { data: patientData, isLoading:  isPatientLoading, error: patientError} = useGetPatientById(id || "");
    const { data: appointmentsData, isLoading: isAppointmentLoading, error: appointmentError } = useGetAllAppointments();

    // Filter appointment for the specific patient
  const patientAppointment = useMemo(() => {
    if (!appointmentsData) return [];
    return appointmentsData.filter((appt: any) => String(appt.patient?.id) === String(id));
  }, [appointmentsData, id]);

    if (isPatientLoading || isAppointmentLoading) {
        return <div>Loading...</div>;
    }
    
    if (patientError && appointmentError) {
        console.error('Error details:', { patientError , appointmentError });
        return <div>Error loading data. Please check the console for more details.</div>;
    }
    
    if (!patientData) {
       return <div>No patient data found</div>;
    }
    
  return (
    <MainLayout>
        <Header Title="Patient Details" />
        <div className="flex flex-1 flex-col gap-4 p-4">
            <PatientDetailsList patientData ={patientData}/>
            <PatientAppointment appointmentData={patientAppointment}/>
            <div className="flex">
                <Link to={`/patients`}>
                    <Button className="bg-gray-500 hover:bg-gray-600">Back to Patients List</Button>
                </Link>
            </div>
        </div> 
  </MainLayout>
  )
}

export default PatientDetails