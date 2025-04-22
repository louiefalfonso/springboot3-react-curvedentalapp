import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"

import Header from "../layout/header"
import MainLayout from "../layout/layout"

import { useGetStaffById, useUpdateStaff, useDeleteStaff } from "@/services/staff-services";
import UpdateStaffForm from "./form/update-form";

const UpdateStaff = () => {

  // get department ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch department data
  const { data, isLoading } = useGetStaffById(id || "");
  const { mutate } = useUpdateStaff(id || "");
  const { mutate: deleteStaff } = useDeleteStaff();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

useEffect(()=>{
    if (data) {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setStaffRole(data.staffRole);
        setEmployeeNumber(data.employeeNumber);
        setEmail(data.email);
        setGender(data.gender);
        setPhoneNumber(data.phoneNumber);
        setAge(data.age);
        setAddress(data.address);
        }
    }, [data]);

   if (isLoading) { return <div>Loading...</div>;}
   if (!data) { return <div>No data found</div>;}

   // update staff
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !staffRole || !employeeNumber || !phoneNumber || !age || !address) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const currentStaff = {
     id: id || "",
        firstName,
        lastName,
        staffRole,
        employeeNumber,
        email,
        gender,
        phoneNumber,
        age,
        address,
    };

    try {
     mutate(currentStaff, {
       onSuccess: () => {
         toast.success("Staff Updated Successfully");
         navigate("/staffs");
       },
       onError: (error) => {
         console.error("Error Updating Staff:", error);
         toast.error("Failed to update staff. Please try again.");
       },
     });
   } catch (error) {
     console.error("Unexpected error:", error);
     toast.error("An unexpected error occurred. Please try again.");
   }
  }

  // delete staff
  const handleDelete = () =>{
    try {
      deleteStaff(id || "", {
        onSuccess: () => {
          toast.success("Staff Deleted successfully");
          navigate("/staffs");
        },
        onError: (error) => {
          console.error("Error deleting staff:", error);
          toast.error("Failed to delete staff. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
   }

  return (
    <MainLayout>
      <Header Title="Update Staff" />
        <div className="flex flex-1 flex-col gap-4 p-4">
            <UpdateStaffForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            staffRole={staffRole}
            setStaffRole={setStaffRole}
            employeeNumber={employeeNumber}
            setEmployeeNumber={setEmployeeNumber}
            email={email}
            setEmail={setEmail}
            gender={gender}
            setGender={setGender}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            age={age}
            setAge={setAge}
            address={address}
            setAddress={setAddress}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            staffId={id || ""}
            />
        </div>
     <Toaster />
    </MainLayout>    
  )
}

export default UpdateStaff