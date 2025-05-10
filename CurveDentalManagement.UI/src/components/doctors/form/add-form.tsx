import React, { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Treatment = {
    id: number;
    treatmentName: string;
};

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
    treatments: Treatment[];
}

interface DoctorProps { 
    treatments: Treatment[];
    onSubmit: (doctor: Doctor) => void; 
}

const AddNewDoctorForm:React.FC<DoctorProps> = ({treatments, onSubmit}) => {

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

    const [selectedTreatments, setSelectedTreatments] = useState<Treatment[]>([]);

    const handleTreatmentSelect = useCallback((treatmentId: number) => {
        setSelectedTreatments((prevSelected) => {
            const isAlreadySelected = prevSelected.some(treatment => treatment.id === treatmentId);
            if (isAlreadySelected) {
                return prevSelected.filter(treatment => treatment.id !== treatmentId);
            } else {
                const treatment = treatments.find((treatment) => treatment.id === treatmentId);
                return treatment ? [...prevSelected, treatment] : prevSelected;
            }
        });
    }, [treatments]);

    const newDoctor = useMemo<Doctor>(
        ()=>({
            firstName, lastName, email, contactNumber, specialization, department, schedule, licenseNumber, yearsOfExperience, 
            dentalSchool, officeAddress, emergencyContact,
            treatments: selectedTreatments,
        }),[firstName, lastName, email, contactNumber, specialization, department, schedule, licenseNumber, yearsOfExperience, 
            dentalSchool, officeAddress, emergencyContact, selectedTreatments]
    );

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();

        if (selectedTreatments.length === 0) {
            toast.error("Please Select at least one Treatment");
            return;
        }

        onSubmit(newDoctor);
    }

  return (
   <form onSubmit={handleSubmit}>
     <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Doctor Information</h2>
     <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="firstName">First Name:</Label>
          <Input type="text" id="firstName" placeholder="First Name" aria-label="First Name" onChange={(e) => setFirstName(e.target.value)}/>
          <Label htmlFor="contactNumber">Phone Number:</Label>
          <Input type="text" id="contactNumber" placeholder="Phone Number" aria-label="Phone Number" onChange={(e) => setContactNumber(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="lastName">Last Name:</Label>
            <Input type="text" id="lastName" placeholder="Last Name" aria-label="Last Name" onChange={(e) => setLastName(e.target.value)}/>
            <Label htmlFor="email">Email Address:</Label>
            <Input type="text" id="email" placeholder="Email Address" aria-label="Email Address"  onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="specialization">Specialization:</Label>
            <Input type="text" id="specialization" placeholder="Specialization" aria-label="Specialization"  onChange={(e) => setSpecialization(e.target.value)}/>
            <Label htmlFor="department">Department:</Label>
            <Input type="text" id="department" placeholder="Department" onChange={(e) => setDepartment(e.target.value)}/>
        </div>
     </div>

     <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Professional Information</h2>
     <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="licenseNumber">License Number:</Label>
            <Input type="text" id="licenseNumber" placeholder="License Number" aria-label="License Number" onChange={(e) => setLicenseNumber(e.target.value)}/>
        </div>
         <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="yearsOfExperience">Years Of Experience:</Label>
            <Input type="text" id="yearsOfExperience" placeholder="Years Of Experience" aria-label="Years Of Experience" onChange={(e) => setYearsOfExperience(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="dentalSchool">Dental School:</Label>
            <Input type="text" id="dentalSchool" placeholder="Dental School" aria-label="Dental School" onChange={(e) => setDentalSchool(e.target.value)}/>
        </div>    
     </div>
     <div className="grid auto-rows-min md:grid-cols-3">
         <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="schedule">Schedule:</Label>
            <Textarea id="schedule" placeholder="Schedule" aria-label="Schedule" onChange={(e) => setSchedule(e.target.value)}/>
         </div>
         <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="officeAddress">Office Address:</Label>
            <Textarea id="officeAddress" placeholder="Office Address" aria-label="Office Address" onChange={(e) => setOfficeAddress(e.target.value)}/>
         </div>
         <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="emergencyContact">Emergency Contact:</Label>
            <Textarea id="emergencyContact" placeholder="Emergency Contact" aria-label="Emergency Contact" onChange={(e) => setEmergencyContact(e.target.value)}/>
         </div>
     </div>
     <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="treatment">Treatments:</Label>
            <div className="flex flex-row flex-wrap">
            {treatments?.map((treatment: Treatment) => (
                <label key={treatment.id} className="flex items-center mr-4">
                <input
                    type="checkbox"
                    value={treatment.id}
                    checked={selectedTreatments.some(t => t.id === treatment.id)}
                    onChange={() => handleTreatmentSelect(treatment.id)}
                />
                <span className="ml-2">{treatment.treatmentName}</span>
                </label>
            ))}

            <Label htmlFor="treatment">Treatments:</Label>
            <Select onValueChange={(value) => handleTreatmentSelect(parseInt(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Treatments" />
                </SelectTrigger>
                <SelectContent>
                  {treatments?.map((treatment: Treatment) => (
                    <SelectItem key={treatment.id} value={treatment.id.toString()}>
                      {treatment.treatmentName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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