import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import { useAddNewAppointment } from "@/services/appointment-services";
import { useGetAllDoctors } from "@/services/doctor-services";
import { useGetAllPatients } from "@/services/patient-services";
import AddNewAppointmentForm from "./form/add.form";

const SUCCESS_MESSAGE = "Appointment Added Successfully";
const ERROR_MESSAGE = "Failed to Add Appointment.";

const AddNewAppointment = () => {

   // Declare state variables
   const navigate = useNavigate();
   const { mutate } = useAddNewAppointment();
   const { data: doctors } = useGetAllDoctors();
   const { data: patients } = useGetAllPatients();

     // Handle form submission for adding a new treatment
  const handleFormSubmit = (newAppointment) => {
    mutate(newAppointment, {
      onSuccess: () => {
        // Show success message and navigate to treatments list
        toast.success(SUCCESS_MESSAGE);
        navigate("/appointments");
      },
      onError: (error: unknown) => {
        // Log error and show error message
        console.error("Error Adding Treatment:", error);
        toast.error(ERROR_MESSAGE);
      },
    });
  };


  return (
    <MainLayout>
      <Header Title="Add New Treatment" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewAppointmentForm doctors={doctors || []} patients={patients || []} onSubmit={handleFormSubmit}/>
      </div>
    </MainLayout>  
  )
}

export default AddNewAppointment