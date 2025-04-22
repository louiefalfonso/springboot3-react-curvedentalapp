import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import AddNewStaffForm from "./form/add-form";
import { useAddNewStaff } from "@/services/staff-services";

const AddNewStaff = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewStaff();

  // Handle form submission
  const handleFormSubmit = (newStaff) => {
    try {
      mutate(newStaff, {
        onSuccess: () => {
          toast.success("Staff Added Successfully");
          navigate("/staffs");
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
      <Header Title="Add New Staff" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewStaffForm onSubmit={handleFormSubmit} />
      </div>
    </MainLayout>
  )
}

export default AddNewStaff