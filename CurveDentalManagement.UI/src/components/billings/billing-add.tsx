import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import { useGetAllPatients } from "@/services/patient-services";
import { useGetAllTreatments } from "@/services/treatment-services";
import { useAddNewBilling } from "@/services/billing-services";
import AddNewBillingForm from "./form/add-form";

const SUCCESS_MESSAGE = "Billing Added Successfully";
const ERROR_MESSAGE = "Failed to Add Billing.";

const AddNewBilling = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewBilling(); 
  const { data: patients } = useGetAllPatients();
  const { data: treatment } = useGetAllTreatments();

  // Handle form submission for adding a new billing
  const handleFormSubmit = (newBilling) => {
      mutate(newBilling, {
        onSuccess: () => {
          // Show success message and navigate to billing list
          toast.success(SUCCESS_MESSAGE);
          navigate("/billings");
        },
        onError: (error: unknown) => {
          // Log error and show error message
          console.error("Error Adding Billing:", error);
          toast.error(ERROR_MESSAGE);
        },
      });
    };

  return (
    <MainLayout>
      <Header Title="Add New Billing" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewBillingForm 
          patients={patients || []} 
          treatments={treatment || []} 
          onSubmit={handleFormSubmit} 
        />
      </div>
    </MainLayout>  
  )
}

export default AddNewBilling