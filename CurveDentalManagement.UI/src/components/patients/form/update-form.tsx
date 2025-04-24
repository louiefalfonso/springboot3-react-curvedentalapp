import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DeletePatientDialog from "../patient-delete";

type PatientFormProps = { 
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    dateOfBirth: Date | undefined;
    setDateOfBirth: (value: Date | undefined) => void;
    age: string;
    setAge: (value: string) => void;
    gender: string;
    setGender: (value: string) => void;
    emailAddress: string;
    setEmailAddress: (value: string) => void;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    address: string;
    setAddress: (value: string) => void;
    insuranceDetails: string;
    setInsuranceDetails: (value: string) => void;
    insuranceProvider: string;
    setInsuranceProvider: (value: string) => void;
    insurancePolicyNumber: string;
    setInsurancePolicyNumber: (value: string) => void;
    insuranceExpiryDate: Date | undefined;
    setInsuranceExpiryDate: (value: Date | undefined) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleDelete: () => void;
    patientId: string;
  }

const UpdatePatientForm: React.FC<PatientFormProps> = ({
    firstName, setFirstName,
    lastName, setLastName,
    dateOfBirth, setDateOfBirth,
    age, setAge,
    gender, setGender,
    emailAddress, setEmailAddress,
    phoneNumber, setPhoneNumber,
    address, setAddress,
    insuranceDetails, setInsuranceDetails,
    insuranceProvider, setInsuranceProvider,
    insurancePolicyNumber, setInsurancePolicyNumber,
    insuranceExpiryDate, setInsuranceExpiryDate,
    handleSubmit, handleDelete, patientId
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Patient Information</h2>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="firstName">First Name:</Label>
            <Input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <Label htmlFor="emailAddress">Email Address:</Label>
            <Input type="text" id="emailAddress" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
            <Label htmlFor="phoneNumber">Phone Number:</Label>
            <Input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <Label htmlFor="dateOfBirth">Date Of Birth :</Label>
            <Input type="date" id="dateOfBirth" value={dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : ""}
                onChange={(e) => { const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                  if (selectedDate && selectedDate > new Date()) {
                    alert("Date of birth cannot be in the future.");
                    return;
                  }
                  setDateOfBirth(selectedDate);
                }}
              />
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="lastName">Last Name:</Label>
          <Input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          <Label htmlFor="age">Age:</Label>
          <Input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)}/>
          <Label htmlFor="address">Address:</Label>
          <Input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
          <Label htmlFor="gender">Gender:</Label>
            <Input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}/>
        </div>
      </div>

      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Insurance Details</h2>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="insurancePolicyNumber">Insurance Policy Number:</Label>
            <Input type="text" id="insurancePolicyNumber" value={insurancePolicyNumber} onChange={(e) => setInsurancePolicyNumber(e.target.value)}/>  
            <Label htmlFor="insuranceProvider">insurance Provider:</Label>
            <Textarea id="insuranceProvider" value={insuranceProvider} onChange={(e) => setInsuranceProvider(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="insuranceExpiryDate">Insurance Expiry Date :</Label>
          <Input type="date" id="insuranceExpiryDate" value={insuranceExpiryDate ? format(insuranceExpiryDate, "yyyy-MM-dd") : ""}
              onChange={(e) => { const selectedDate = e.target.value ? new Date(e.target.value) : undefined; setInsuranceExpiryDate(selectedDate); }}
          /> 
          <Label htmlFor="insuranceDetails">Insurance Details:</Label>
          <Textarea id="insuranceDetails" value={insuranceDetails} onChange={(e) => setInsuranceDetails(e.target.value)}/>
        </div> 
      </div>
      <div className="flex pl-4 mt-4 ">
        <Button type="submit" className=" bg-orange-600 hover:bg-orange-700" aria-label="Update Staff">
          Update Patient
        </Button>
        <DeletePatientDialog patientId={patientId} onDelete={handleDelete} aria-label="Delete Patient"/>
        <Link to={`/patients`}>
          <Button className ="bg-gray-500 hover:bg-gray-600">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  )
}

export default UpdatePatientForm