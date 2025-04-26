import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Staff = {
    id?: string; 
    firstName?: string;
    lastName?: string;
    staffRole?: string;
    employeeNumber?:string;
    email?: string;
    gender?: string;
    phoneNumber?: string;
    age?: string;
    address?: string;
}

interface StaffProps {
    onSubmit: (staff: Staff) => void;
}

const AddNewStaffForm: React.FC<StaffProps> = ({onSubmit}) => {

    // Group State Variables
    const [staffData, setStaffData] = useState({
        firstName:"",
        lastName:"",
        staffRole:"",
        employeeNumber:"",
        email:"",
        gender:"",
        phoneNumber:"",
        age:"",
        address:""
    })

     // Input handlers to use handleInputChange
    const handleInputChange = (field: keyof typeof staffData, value: string ) => {
        setStaffData((prev) => ({ ...prev, [field]: value }));
    };

    const newStaff = useMemo<Staff>(
        ()=>({ id: "", ...staffData }), [staffData]
    );

    const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(newStaff);
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="firstName">First Name:</Label>
                <Input type="text" id="firstName" placeholder="First Name" onChange={(e) => handleInputChange("firstName", e.target.value)}/>
                <Label htmlFor="lastName">Last Name:</Label>
                <Input type="text" id="lastName" placeholder="Last Name" onChange={(e) => handleInputChange("lastName", e.target.value)}/>
                <Label htmlFor="staffRole">Role:</Label>
                <Input type="text" id="staffRole" placeholder="Staff Role" onChange={(e) => handleInputChange("staffRole", e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="employeeNumber">Employee Number:</Label>
                <Input type="text" id="employeeNumber" placeholder="Employee Number" onChange={(e) => handleInputChange("employeeNumber", e.target.value)}/>
                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" placeholder="Email" onChange={(e) => handleInputChange("email", e.target.value)}/>
                <Label htmlFor="gender">Gender:</Label>
                <Input type="text" id="gender" placeholder="Gender" onChange={(e) => handleInputChange("gender", e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="phoneNumber">Phone Number:</Label>
                <Input type="text" id="phoneNumber" placeholder="Phone Number" onChange={(e) => handleInputChange("firstName", e.target.value)}/>
                <Label htmlFor="age">Age:</Label>
                <Input type="text" id="age" placeholder="Age" onChange={(e) => handleInputChange("age", e.target.value)}/>
                <Label htmlFor="address">Address:</Label>
                <Textarea id="address" placeholder="Address" onChange={(e) => handleInputChange("address", e.target.value)}/>
            </div>
        </div>
        <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
              Add New Staff
            </Button>
            <Link to={`/staffs`}>
              <Button className="bg-gray-500 hover:bg-gray-600">Back</Button>
            </Link>
        </div>
    </form>
  )
}

export default AddNewStaffForm