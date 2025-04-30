import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import { useAddNewTreatment } from "@/services/treatment-services";
import AddNewTreatmentForm from "./form/add-form";

const AddNewTreatment = () => {

   // Declare state variables
   const navigate = useNavigate();
   const { mutate } = useAddNewTreatment()

  // Handle form submission
  const handleFormSubmit = (newTreatment) => {
    try {
      mutate(newTreatment, {
        onSuccess: () => {
          toast.success("Treatment Added Successfully");
          navigate("/treatments");
        },
        onError: (error) => {
          console.error("Error Adding Treatment:", error);
          toast.error("Failed to Add Treatment.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
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