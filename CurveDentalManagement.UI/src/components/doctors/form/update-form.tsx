import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DeleteDoctorDialog from "../doctor-delete";

type DoctorFormProps ={
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    contactNumber: string;
    setContactNumber: (value: string) => void;
    specialization: string;
    setSpecialization: (value: string) => void;
    department: string;
    setDepartment: (value: string) => void;
    schedule: string;
    setSchedule: (value: string) => void;
    licenseNumber: string;
    setLicenseNumber: (value: string) => void;
    yearsOfExperience: string;
    setYearsOfExperience: (value: string) => void;
    dentalSchool: string;
    setDentalSchool: (value: string) => void;
    officeAddress: string;
    setOfficeAddress: (value: string) => void;
    emergencyContact: string;
    setEmergencyContact: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleDelete: () => void;
    doctorId: string;
}

const UpdateDoctorForm: React.FC<DoctorFormProps> = React.memo (({
    firstName, setFirstName,
    lastName, setLastName,
    email, setEmail,
    contactNumber, setContactNumber,
    specialization, setSpecialization,
    department, setDepartment,
    schedule, setSchedule,
    licenseNumber, setLicenseNumber,
    yearsOfExperience, setYearsOfExperience,
    dentalSchool, setDentalSchool,
    officeAddress, setOfficeAddress,
    emergencyContact, setEmergencyContact,
    handleSubmit, handleDelete, doctorId
}) => {
 const formFields =[
    { label: "First Name", id: "firstName", value: firstName, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value) },
    { label: "Last Name", id: "lastName", value: lastName, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value) },
    { label: "Specialization", id: "specialization", value: specialization, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSpecialization(e.target.value) },
    { label: "Phone Number", id: "contactNumber", value: contactNumber, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setContactNumber(e.target.value) },
    { label: "Email Address", id: "email", value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) }, 
    { label: "Department", id: "department", value: department, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value) }
 ]

  return (
    <form onSubmit={handleSubmit}>
        <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Doctor Information</h2>
        <div className="grid auto-rows-min md:grid-cols-3">
            {formFields.map(({ label, id, value, onChange }) => (
            <div key={id} className="grid w-full items-center gap-4 p-4">
                <Label htmlFor={id}>{label}:</Label>
                <Input type="text" id={id} value={value} onChange={onChange} />
            </div>
        ))}
        </div>
        <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Professional Information</h2>
        <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="licenseNumber">License Number:</Label>
                <Input type="text" id="licenseNumber" value={licenseNumber} onChange={(e) => setLicenseNumber( e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="yearsOfExperience">Years Of Experience:</Label>
                <Input type="text" id="yearsOfExperience" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="dentalSchool">Dental School:</Label>
                <Input type="text" id="dentalSchool" value={dentalSchool} onChange={(e) => setDentalSchool(e.target.value)}/>
            </div>    
        </div>
        <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="schedule">Schedule:</Label>
                <Textarea id="schedule" value={schedule} onChange={(e) => setSchedule( e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="officeAddress">Office Address:</Label>
                <Textarea id="officeAddress" value={officeAddress} onChange={(e) => setOfficeAddress(e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="emergencyContact">Emergency Contact:</Label>
                <Textarea id="emergencyContact" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)}/>
            </div>
        </div>
     

        <div className="flex pl-4 mt-4 ">
            <Button type="submit" className=" bg-orange-600 hover:bg-orange-700" aria-label="Update Doctor">
            Update Doctor
            </Button>
            <DeleteDoctorDialog doctorId={doctorId} onDelete={handleDelete}/>
            <Link to={`/doctors`}>
                <Button className ="bg-gray-500 hover:bg-gray-600">
                Cancel
                </Button>
            </Link>
        </div>
    </form>

)
})
export default UpdateDoctorForm