import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DeleteStaffDialog from "../staff-delete"

type StaffFormProps = {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    staffRole: string;
    setStaffRole: (value: string) => void;
    employeeNumber:string;
    setEmployeeNumber: (value: string) => void;
    email: string;
    setEmail: (value: string) => void
    gender: string;
    setGender: (value: string) => void;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    age: string;
    setAge: (value: string) => void;
    address: string;
    setAddress: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleDelete: () => void;
    staffId: string;
}
const UpdateStaffForm: React.FC<StaffFormProps> = ({
    firstName, setFirstName,
    lastName, setLastName,
    staffRole, setStaffRole,
    employeeNumber, setEmployeeNumber,
    email, setEmail,
    gender, setGender,
    phoneNumber, setPhoneNumber,
    age, setAge,
    address,setAddress,
    handleSubmit,handleDelete,staffId

}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="firstName">First Name:</Label>
                <Input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <Label htmlFor="lastName">Last Name:</Label>
                <Input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <Label htmlFor="staffRole">Role:</Label>
                <Input type="text" id="staffRole" value={staffRole} onChange={(e) => setStaffRole(e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="employeeNumber">Employee Number:</Label>
                <Input type="text" id="employeeNumber" value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)}/>
                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Label htmlFor="gender">Gender:</Label>
                <Input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="phoneNumber">Phone Number:</Label>
                <Input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                <Label htmlFor="age">Age:</Label>
                <Input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)}/>
                <Label htmlFor="address">Address:</Label>
                <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>
      </div>
      <div className="flex pl-4">
        <Button type="submit" className=" bg-orange-600 hover:bg-orange-700" aria-label="Update Staff">
          Update Staff
        </Button>
        <DeleteStaffDialog staffId={staffId} onDelete={handleDelete} aria-label="Delete Staff"/>
        <Link to={`/staffs`}>
          <Button className ="bg-gray-500 hover:bg-gray-600">
            Cancel
          </Button>
        </Link>
        
      </div>
    </form>  
  )
}

export default UpdateStaffForm