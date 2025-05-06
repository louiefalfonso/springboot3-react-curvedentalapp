import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import { useAddNewTreatment } from "@/services/treatment-services";
import AddNewTreatmentForm from "./form/add-form";

const SUCCESS_MESSAGE = "Treatment Added Successfully";
const ERROR_MESSAGE = "Failed to Add Treatment.";

const AddNewTreatment = () => {

   // Declare state variables
   const navigate = useNavigate();
   const { mutate } = useAddNewTreatment()

  // Handle form submission for adding a new treatment
  const handleFormSubmit = (newTreatment) => {
    mutate(newTreatment, {
      onSuccess: () => {
        // Show success message and navigate to treatments list
        toast.success(SUCCESS_MESSAGE);
        navigate("/treatments");
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
        <AddNewTreatmentForm onSubmit={handleFormSubmit}/>
      </div>
    </MainLayout>  
  )
}

export default AddNewTreatment