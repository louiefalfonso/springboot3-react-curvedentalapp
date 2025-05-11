import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Treatment = {
  id: number;
  treatmentName: string;
};

type Doctor = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  specialization: string;
  department: string;
  schedule: string;
  licenseNumber: string;
  yearsOfExperience: string;
  dentalSchool: string;
  officeAddress: string;
  emergencyContact: string;
  treatments: number[]; // Array of selected treatment IDs
};

interface AddDoctorFormProps {
  onSubmit: (doctor: Doctor) => void;
  treatments: { id: number; treatmentName: string }[] | undefined;
}

const AddNewDoctorForm: React.FC<AddDoctorFormProps> = ({ onSubmit, treatments = [] }) => {
  // State for doctor details
  const [doctorData, setDoctorData] = useState<Doctor>({
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
    treatments: [], // Initialize with an empty array
  });

  // Input handler for updating state
  const handleInputChange = (field: keyof Doctor, value: string | number[]) => {
    setDoctorData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(doctorData);
  };

  // Define form fields dynamically
  const formFields = [
    { label: "First Name", id: "firstName", type: "text", placeholder: "First Name" },
    { label: "Last Name", id: "lastName", type: "text", placeholder: "Last Name" },
    { label: "Email Address", id: "email", type: "text", placeholder: "Email Address" },
    { label: "Phone Number", id: "contactNumber", type: "text", placeholder: "Phone Number" },
    { label: "Specialization", id: "specialization", type: "text", placeholder: "Specialization" },
    { label: "Department", id: "department", type: "text", placeholder: "Department" },
    
  ];

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">
        Doctor Information
      </h2>
      <div className="grid auto-rows-min md:grid-cols-3">
        {formFields.map(({ label, id, type, placeholder }) => (
          <div key={id} className="grid w-full items-center gap-4 p-4">
            <Label htmlFor={id}>{label}:</Label>
            <Input
                type={type}
                id={id}
                placeholder={placeholder}
                value={doctorData[id as keyof Doctor] as string}
                onChange={(e) => handleInputChange(id as keyof Doctor, e.target.value)}
              />
          </div>
        ))}
      </div>
       <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">
        Professional Information
      </h2>

      <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="treatments">Treatments:</Label>
          <Select
            isMulti
            options={treatments?.map((treatment) => ({
              value: treatment.id,
              label: treatment.treatmentName,
            }))}
            value={doctorData.treatments.map((id) => ({
              value: id,
              label: treatments?.find((treatment) => treatment.id === id)?.treatmentName,
            }))}
            onChange={(selectedOptions) => {
              if (selectedOptions) {
                handleInputChange(
                  "treatments",
                  selectedOptions.map((option) => option.value)
                );
              } else {
                handleInputChange("treatments", []);
              }
            }}
            classNamePrefix="custom-select"
          />
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="licenseNumber">License Number:</Label>
          <Input
            type="text"
            id="licenseNumber"
            placeholder="License Number"
            onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="yearsOfExperience">Years Of Experience:</Label>
          <Input
            type="text"
            id="yearsOfExperience"
            placeholder="Years Of Experience"
            onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="dentalSchool">Dental School:</Label>
          <Input
            type="text"
            id="dentalSchool"
            placeholder="Dental School"
            onChange={(e) => handleInputChange("dentalSchool", e.target.value)}
          />
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="schedule">Schedule:</Label>
          <Textarea id="schedule" placeholder="Schedule" onChange={(e) => handleInputChange("schedule", e.target.value)}/> 
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="officeAddress">Office Address:</Label>
          <Textarea id="officeAddress" placeholder="Office Address" onChange={(e) => handleInputChange("officeAddress", e.target.value)}/> 
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="emergencyContact">Emergency Contact:</Label>
          <Textarea id="emergencyContact" placeholder="Emergency Contact" onChange={(e) => handleInputChange("emergencyContact", e.target.value)}/> 
        </div>
      </div>

      <div className="flex pl-4 mt-4">
        <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
          Add Doctor
        </Button>
        <Link to={`/doctors`}>
          <Button className="bg-gray-500 hover:bg-gray-600">Cancel</Button>
        </Link>
      </div>
    </form>
  );
};

export default AddNewDoctorForm;