import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import AddNewPatientForm from "./form/add-form";
import { useAddNewPatient } from "@/services/patient-services";

const AddNewPatient = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewPatient();

  // Handle form submission
  const handleFormSubmit = (newPatient) => {
    try {
      mutate(newPatient, {
        onSuccess: () => {
          toast.success("Patient Added Successfully");
          navigate("/patients");
        },
        onError: (error) => {
          console.error("Error Adding Staff:", error);
          toast.error("Failed to Add Staff.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  };
  return (
    <MainLayout>
      <Header Title="Add New Patient" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewPatientForm onSubmit={handleFormSubmit} />
      </div>
    </MainLayout>
  );
};

export default AddNewPatient;
