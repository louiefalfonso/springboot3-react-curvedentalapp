import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Doctor = {
    id?: string; 
    firstName?: string;
    lastName?: string;
    email?: string;
    contactNumber?: string;
    specialization?: string;
    department?: string;
    schedule?: string;
    licenseNumber?: string;
    yearsOfExperience?: string;
    dentalSchool?: string;
    officeAddress?: string;
    emergencyContact?: string;
}

interface DoctorProps { onSubmit: (doctor: Doctor) => void; }

const AddNewDoctorForm:React.FC<DoctorProps> = ({onSubmit}) => {

    // Group State Variables
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

    // Input handlers to use handleInputChange
    const handleInputChange = (field: keyof typeof doctorData, value: string ) => {
        setDoctorData((prev) => ({...prev, [field]: value }));
    };

    const newDoctor = useMemo<Doctor>(
        () => ({
            id: "",
            ...doctorData,
        }),
        [doctorData]
    )

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        onSubmit(newDoctor);
    }

  return (
   <form onSubmit={handleSubmit}>
     <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Doctor Information</h2>
     <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="firstName">First Name:</Label>
          <Input type="text" id="firstName" placeholder="First Name" onChange={(e) => handleInputChange("firstName", e.target.value)}/>
          <Label htmlFor="contactNumber">Phone Number:</Label>
          <Input type="text" id="contactNumber" placeholder="Phone Number" onChange={(e) => handleInputChange("contactNumber", e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="lastName">Last Name:</Label>
            <Input type="text" id="lastName" placeholder="Last Name" onChange={(e) => handleInputChange("lastName", e.target.value)}/>
            <Label htmlFor="email">Email Address:</Label>
            <Input type="text" id="email" placeholder="Email Address" onChange={(e) => handleInputChange("email", e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="specialization">Specialization:</Label>
            <Input type="text" id="specialization" placeholder="Specialization" onChange={(e) => handleInputChange("specialization", e.target.value)}/>
            <Label htmlFor="department">Department:</Label>
            <Input type="text" id="department" placeholder="Department" onChange={(e) => handleInputChange("department", e.target.value)}/>
        </div>
     </div>

     <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Professional Information</h2>
     <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="licenseNumber">License Number:</Label>
            <Input type="text" id="licenseNumber" placeholder="License Number" onChange={(e) => handleInputChange("licenseNumber", e.target.value)}/>
        </div>
         <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="yearsOfExperience">Years Of Experience:</Label>
            <Input type="text" id="yearsOfExperience" placeholder="Years Of Experience" onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="dentalSchool">Dental School:</Label>
            <Input type="text" id="dentalSchool" placeholder="Dental School" onChange={(e) => handleInputChange("dentalSchool", e.target.value)}/>
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

     <div className="flex pl-4 mt-4 ">
     <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">Add New Doctor</Button>
     <Link to={`/doctors`}> <Button className="bg-gray-500 hover:bg-gray-600">Back</Button> </Link>
     </div>
   </form>
  )
}

export default AddNewDoctorForm