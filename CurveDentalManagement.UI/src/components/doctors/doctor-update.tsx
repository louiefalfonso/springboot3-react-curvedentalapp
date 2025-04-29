import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"

import Header from "../layout/header"
import MainLayout from "../layout/layout"

import { useGetDoctorById, useUpdateDoctor, useDeleteDoctor } from "@/services/doctor-services"
import UpdateDoctorForm from "./form/update-form"

const UpdateDoctor = () => {

  // get doctor Id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch doctor data
  const { data, isLoading } = useGetDoctorById(id || "");
  const { mutate } = useUpdateDoctor(id || "");
  const { mutate: deleteDoctor } = useDeleteDoctor();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");
  const [schedule, setSchedule] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [dentalSchool, setDentalSchool] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  // set form values when data is fetched
  useEffect(()=>{
    if(data) {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setContactNumber(data.contactNumber);
      setSpecialization(data.specialization);
      setDepartment(data.department);
      setSchedule(data.schedule);
      setLicenseNumber(data.licenseNumber);
      setYearsOfExperience(data.yearsOfExperience);
      setDentalSchool(data.dentalSchool);
      setOfficeAddress(data.officeAddress);
      setEmergencyContact(data.emergencyContact)
    }
  },[data])


  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentDoctor ={
      id: id || "",
      firstName, lastName, email, contactNumber, specialization, department, schedule,
      licenseNumber, yearsOfExperience, dentalSchool, officeAddress, emergencyContact
    }

    try {
      mutate(currentDoctor, {
        onSuccess: () => {
          toast.success("Doctor Updated successfully");
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
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          contactNumber={contactNumber}
          setContactNumber={setContactNumber}
          specialization={specialization}
          setSpecialization={setSpecialization}
          department={department}
          setDepartment={setDepartment}
          schedule={schedule}
          setSchedule={setSchedule}
          licenseNumber={licenseNumber}
          setLicenseNumber={setLicenseNumber}
          yearsOfExperience={yearsOfExperience}
          setYearsOfExperience={setYearsOfExperience}
          dentalSchool={dentalSchool}
          setDentalSchool={setDentalSchool}
          officeAddress={officeAddress}
          setOfficeAddress={setOfficeAddress}
          emergencyContact={emergencyContact}
          setEmergencyContact={setEmergencyContact}
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