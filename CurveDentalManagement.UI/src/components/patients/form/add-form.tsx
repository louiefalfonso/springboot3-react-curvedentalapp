import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Patient = {
  id?: string; 
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  age?: string
  gender?: string;
  emailAddress?: string;
  phoneNumber?: string;
  address?: string;
  insuranceDetails?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  insuranceExpiryDate?: string;
}

interface PatientProps {
  onSubmit: (patient: Patient) => void;
}

const AddNewPatientForm: React.FC<PatientProps> = ({onSubmit}) => {
  
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
  const [insuranceExpiryDate, setInsuranceExpiryDate] = useState<Date | null>(null)
  
  const newPatient = useMemo<Patient>(
    () => ({
      id: "", firstName, lastName, age, gender, phoneNumber, emailAddress, address, insuranceDetails, insuranceProvider, insurancePolicyNumber, 
      insuranceExpiryDate: insuranceExpiryDate ? format(insuranceExpiryDate,"MM-dd-yyyy") : undefined,
      dateOfBirth: dateOfBirth ? format(dateOfBirth,"MM-dd-yyyy") : undefined
    }),[ firstName, lastName, dateOfBirth, age, gender, emailAddress, phoneNumber, address, insuranceDetails, insuranceProvider, insurancePolicyNumber, insuranceExpiryDate ]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newPatient);
}

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Patient Information</h2>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="firstName">First Name:</Label>
            <Input type="text" id="firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
            <Label htmlFor="emailAddress">Email Address:</Label>
            <Input type="text" id="emailAddress" placeholder="Email Address" onChange={(e) => setEmailAddress(e.target.value)}/>
            <Label htmlFor="phoneNumber">Phone Number:</Label>
            <Input type="text" id="phoneNumber" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}/>
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
          <Input type="text" id="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
          <Label htmlFor="age">Age:</Label>
          <Input type="text" id="age" placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
          <Label htmlFor="address">Address:</Label>
          <Input type="text" id="address" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
          <Label htmlFor="gender">Gender:</Label>
            <Input type="text" id="gender" placeholder="Gender" onChange={(e) => setGender(e.target.value)}/>
        </div>
      </div>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Insurance Details</h2>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="insurancePolicyNumber">Insurance Policy Number:</Label>
          <Input type="text" id="insurancePolicyNumber" placeholder="Insurance Policy Number" onChange={(e) => setInsurancePolicyNumber(e.target.value)}/>
          
          <Label htmlFor="insuranceProvider">insurance Provider:</Label>
          <Textarea id="insuranceProvider" placeholder="Insurance Provider" onChange={(e) => setInsuranceProvider(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="insuranceExpiryDate">Insurance Expiry Date :</Label>
          <Input type="date" id="paymentDate" value={insuranceExpiryDate ? format(insuranceExpiryDate, "yyyy-MM-dd") : ""}
              onChange={(e) => { const selectedDate = e.target.value ? new Date(e.target.value) : null; setInsuranceExpiryDate(selectedDate); }}
          />
          <Label htmlFor="insuranceDetails">Insurance Details:</Label>
          <Textarea id="insuranceDetails" placeholder="Insurance Details" onChange={(e) => setInsuranceDetails(e.target.value)}/> 
        </div> 
      </div>
      <div className="flex pl-4 mt-4 ">
        <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">Add New Patient</Button>
        <Link to={`/patients`}> <Button className="bg-gray-500 hover:bg-gray-600">Back</Button> </Link>
      </div>
    </form>  
  )
}

export default AddNewPatientForm