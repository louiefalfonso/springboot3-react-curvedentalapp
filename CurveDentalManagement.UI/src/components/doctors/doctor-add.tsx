import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import AddNewDoctorForm from "./form/add-form";
import { useAddNewDoctor } from "@/services/doctor-services";
import { useGetAllTreatments } from "@/services/treatment-services";

const AddNewDoctor = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewDoctor();
  const { data: treatments } = useGetAllTreatments();

    // Handle form submission
    const handleFormSubmit = (newDoctor) => {
      try {
        mutate(newDoctor, {
          onSuccess: () => {
            toast.success("Doctor Added Successfully");
            navigate("/doctors");
          },
          onError: (error) => {
            console.error("Error Adding Doctor:", error);
            toast.error("Failed to Add Doctor.");
          },
        });
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("Unexpected error occurred.");
      }
    };

  return (
    <MainLayout>
      <Header Title="Add New Doctor" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewDoctorForm treatments={treatments || []} onSubmit={handleFormSubmit}/>
      </div>
    </MainLayout>  
  )
}

export default AddNewDoctor