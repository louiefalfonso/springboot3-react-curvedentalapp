import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"

import Header from "../layout/header"
import MainLayout from "../layout/layout"

import { useGetDoctorById, useUpdateDoctor, useDeleteDoctor } from "@/services/doctor-services"
import { useGetAllTreatments } from "@/services/treatment-services";
import UpdateDoctorForm from "./form/update-form"

const UpdateDoctor = () => {

  // get doctor Id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch doctor data
  const { data, isLoading } = useGetDoctorById(id || "");
  const { mutate } = useUpdateDoctor(id || "");
  const { mutate: deleteDoctor } = useDeleteDoctor();
  const { data: treatments } = useGetAllTreatments();

  // State for doctor details
  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    specialization: "",
    department: "",
    schedule: "",
    licenseNumber: "",
    yearsOfExperience: "",
    dentalSchool: "",
    officeAddress: "",
    emergencyContact: "",
  });

    // State for selected treatments
  const [treatmentIds, setTreatmentIds] = useState<number[]>([]);

    // Set form values when data is fetched
  useEffect(() => {
    if (data) {
      setDoctorData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contactNumber: data.contactNumber,
        specialization: data.specialization,
        department: data.department,
        schedule: data.schedule,
        licenseNumber: data.licenseNumber,
        yearsOfExperience: data.yearsOfExperience,
        dentalSchool: data.dentalSchool,
        officeAddress: data.officeAddress,
        emergencyContact: data.emergencyContact,
      });
      setTreatmentIds(data.treatments.map((treatment: { id: number }) => treatment.id));
    }
  }, [data]);


  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

     const currentDoctor = {
      id: id || "",
      ...doctorData,
      treatments: treatmentIds.map((id) => ({ id })), // Map treatment IDs to objects
    };

    try {
      mutate(currentDoctor, {
        onSuccess: () => {
          toast.success("Doctor Updated Successfully");
          navigate("/doctors");
        },
        onError: (error) => {
          console.error("Error Updating Doctor:", error);
          toast.error("Error Updating doctor");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  // delete doctor
  const handleDelete = () =>{
    try {
      deleteDoctor(id || "", {
        onSuccess: () => {
          toast.success("Doctor Deleted successfully");
          navigate("/doctors");
        },
        onError: (error) => {
          console.error("Error deleting doctor:", error);
          toast.error("Failed to delete doctor. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <MainLayout>
      <Header Title="Update Doctor" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <UpdateDoctorForm
            doctorData={doctorData}
          setDoctorData={setDoctorData}
          treatmentIds={treatmentIds}
          setTreatmentIds={setTreatmentIds}
          treatments={treatments}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          doctorId={id || ""}
          />
        </div>
     <Toaster />
    </MainLayout>      
  )
}

export default UpdateDoctor