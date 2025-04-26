import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import { format } from "date-fns";

import Header from "../layout/header"
import MainLayout from "../layout/layout"

import { useGetPatientById, useUpdatePatient, useDeletePatient } from "@/services/patient-services";
import UpdatePatientForm from "./form/update-form";

const UpdatePatient = () => {
  // get staff ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

   // fetch staff data
  const { data, isLoading } = useGetPatientById(id || "");
  const { mutate } = useUpdatePatient(id || "");
  const { mutate: deleteStaff } = useDeletePatient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [insuranceDetails, setInsuranceDetails] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState("");
  const [insuranceExpiryDate, setInsuranceExpiryDate] = useState<Date | undefined>();

  // set form values when data is fetched
  useEffect(()=>{
    if (data) {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setDateOfBirth(data.dateOfBirth);
        setAge(data.age);
        setGender(data.gender);
        setEmailAddress(data.emailAddress);
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        setInsuranceDetails(data.insuranceDetails);
        setInsuranceProvider(data.insuranceProvider);
        setInsurancePolicyNumber(data.insurancePolicyNumber);
        setInsuranceExpiryDate(data.insuranceExpiryDate);
        }
    }, [data]);

    if (isLoading) { return <div>Loading...</div>;}
    if (!data) { return <div>No data found</div>;}

    // update patient
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!firstName || !lastName || !emailAddress  
        || !dateOfBirth || !age ||  !gender
        || !phoneNumber || !address
        || !insuranceDetails || !insuranceProvider
        || !insurancePolicyNumber || !insuranceExpiryDate) {
        {
        toast.error("Please fill in all required fields.");
        return;
      }
      }
      const currentPatient = {
        id: id || "",
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? format(dateOfBirth, "MM-dd-yyyy") : undefined,
        age,
        gender,
        emailAddress,
        phoneNumber,
        address,
        insuranceDetails,
        insuranceProvider,
        insurancePolicyNumber,
        insuranceExpiryDate: insuranceExpiryDate ? format(insuranceExpiryDate, "MM-dd-yyyy") : undefined,
      }
      try {
        mutate(currentPatient, {
          onSuccess: () => {
            toast.success("Patient Updated successfully");
            navigate("/patients");
          },
          onError: (error) => {
            console.error("Error Updating Patient:", error);
            toast.error("Error Updating patient");
          },
        });
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }

  // delete patient
  const handleDelete = () =>{
    try {
      deleteStaff(id || "", {
        onSuccess: () => {
          toast.success("Patient Deleted successfully");
          navigate("/patients");
        },
        onError: (error) => {
          console.error("Error deleting patient:", error);
          toast.error("Failed to delete patient. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
   }
    

  return (
    <MainLayout>
      <Header Title="Update Patient" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <UpdatePatientForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
          emailAddress={emailAddress}
          setEmailAddress={setEmailAddress}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          address={address}
          setAddress={setAddress}
          insuranceDetails={insuranceDetails}
          setInsuranceDetails={setInsuranceDetails}
          insuranceProvider={insuranceProvider}
          setInsuranceProvider={setInsuranceProvider}
          insurancePolicyNumber={insurancePolicyNumber}
          setInsurancePolicyNumber={setInsurancePolicyNumber}
          insuranceExpiryDate={insuranceExpiryDate}
          setInsuranceExpiryDate={setInsuranceExpiryDate}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          patientId={id || ""}
          />
        </div>
    <Toaster />
   </MainLayout>     
  )
}

export default UpdatePatient