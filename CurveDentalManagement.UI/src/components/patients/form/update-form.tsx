import React from "react";
import { toast } from "sonner";
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

const UpdatePatientForm: React.FC<PatientFormProps> = React.memo(({
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
const formFields = [
  { label: "First Name", id: "firstName", value: firstName, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value) },
  { label: "Phone Number", id: "phoneNumber", value: phoneNumber, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value) },
  { label: "Last Name", id: "lastName", value: lastName, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value) },
  { label: "Date Of Birth", id: "dateOfBirth", value: dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : "", 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => { const selectedDate = e.target.value ? new Date(e.target.value) : undefined; 
      if (selectedDate && selectedDate > new Date()) 
        { toast.error("Date of birth cannot be in the future.");
          return; } 
      setDateOfBirth(selectedDate); } 
  },
  { label: "Email Address", id: "emailAddress", value: emailAddress, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmailAddress(e.target.value) },
  { label: "Gender", id: "gender", value: gender, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value) },
  { label: "Age", id: "age", value: age, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value) },
  { label: "Home Address", id: "address", value: address, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value) },
];

return (
  <form onSubmit={handleSubmit}>
    <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Patient Information</h2>
    <div className="grid auto-rows-min md:grid-cols-4">
      {formFields.map(({ label, id, value, onChange }) => (
        <div key={id} className="grid w-full items-center gap-4 p-4">
          <Label htmlFor={id}>{label}:</Label>
          <Input type="text" id={id} value={value} onChange={onChange} />
        </div>
      ))}
    </div>
    
    <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Insurance Details</h2>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="insurancePolicyNumber">Insurance Policy Number:</Label>
          <Input type="text" id="insurancePolicyNumber" value={insurancePolicyNumber} onChange={(e) => setInsurancePolicyNumber(e.target.value)}/>  
          <Label htmlFor="insuranceProvider">Insurance Provider:</Label>
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
      <Button type="submit" className=" bg-orange-600 hover:bg-orange-700" aria-label="Update Patient">
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
});

export default UpdatePatientForm;
