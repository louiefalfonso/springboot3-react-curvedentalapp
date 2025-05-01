import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Treatment = {
  id?: string;
  treatmentName?: string;
  treatmentCode?: string;
  description?: string;
  duration?: string;
  cost?: string;
  insuranceCoverage?: string;
  followUpCare?: string;
  riskBenefits?: string; 
  indications?: string;
}

interface TreatmentProps { onSubmit: (treatment: Treatment) => void; }

const AddNewTreatmentForm:React.FC<TreatmentProps> = ({onSubmit}) => {

  // Group State Variables
  const [treatmentData , setTreatmentData] = useState({
    treatmentName: "",
    treatmentCode: "",
    cost: "",

    description: "",
    duration: "",
    insuranceCoverage: "",

    followUpCare: "",
    riskBenefits: "", 
    indications: "",
  });

  // Input handlers to use handleInputChange
  const handleInputChange = (field: keyof typeof treatmentData, value: string ) => {
    setTreatmentData((prev) => ({ ...prev, [field]: value }));
  };

  const newTreatment = useMemo<Treatment>(
    () => ({
      id: "",
      ...treatmentData
    }),
    [treatmentData] 
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newTreatment);
}

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Treatment Information</h2>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="treatmentCode">Treatment Code:</Label>
          <Input type="text" id="treatmentCode" placeholder="Treatment Code" onChange={(e) => handleInputChange("treatmentCode", e.target.value)}/>
          <Label htmlFor="treatmentName">Treatment Name:</Label>
          <Input type="text" id="treatmentName" placeholder="Treatment Name" onChange={(e) => handleInputChange("treatmentName", e.target.value)}/>
          <Label htmlFor="cost">Cost Amount:</Label>
          <Input type="text" id="cost" placeholder="Cost Amount" onChange={(e) => handleInputChange("cost", e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="description">Treatment Description:</Label>
          <Textarea id="description" placeholder="Treatment Description" onChange={(e) => handleInputChange("description", e.target.value)}/>
          <Label htmlFor="duration">Duration:</Label>
          <Textarea id="duration" placeholder="Duration" onChange={(e) => handleInputChange("duration", e.target.value)}/>
          <Label htmlFor="insuranceCoverage">Insurance Coverage:</Label>
          <Textarea id="insuranceCoverage" placeholder="Insurance Coverage" onChange={(e) => handleInputChange("insuranceCoverage", e.target.value)}/>    
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="followUpCare">Follow Up Care:</Label>
          <Textarea id="followUpCare" placeholder="Follow Up Care" onChange={(e) => handleInputChange("followUpCare", e.target.value)}/>
          <Label htmlFor="riskBenefits">Risk & Benefits:</Label>
          <Textarea id="riskBenefits" placeholder="Risk & Benefits" onChange={(e) => handleInputChange("riskBenefits", e.target.value)}/>
          <Label htmlFor="indications">Indications:</Label>
          <Textarea id="indications" placeholder="Indications" onChange={(e) => handleInputChange("indications", e.target.value)}/>    
        </div>
      </div>

      <div className="flex pl-4 mt-4 ">
        <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">Add New Patient</Button>
        <Link to={`/treatments`}> <Button className="bg-gray-500 hover:bg-gray-600">Back</Button> </Link>
      </div>
    </form>
  )
}

export default AddNewTreatmentForm