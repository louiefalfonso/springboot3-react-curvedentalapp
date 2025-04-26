import { useParams, Link } from "react-router-dom";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";
import { useGetPatientById } from "@/services/patient-services";
import PatientDetailsList from "./list/list-patient";

const PatientDetails = () => {

    const { id } = useParams();
    const { data: patientData, isLoading:  isPatientLoading, error: patientError} = useGetPatientById(id || "");

    if (isPatientLoading) {
        return <div>Loading...</div>;
    }
    
    if (patientError) {
        console.error('Error details:', { patientError });
        return <div>Error loading data. Please check the console for more details.</div>;
    }
    
    if (!patientData) {
       return <div>No employee data found</div>;
    }
    
  return (
    <MainLayout>
        <Header Title="Patient Details" />
        <div className="flex flex-1 flex-col gap-4 p-4">
            <PatientDetailsList patientData ={patientData}/>
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