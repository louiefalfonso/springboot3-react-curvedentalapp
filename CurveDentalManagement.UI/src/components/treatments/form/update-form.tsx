import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DeleteTreatmentDialog from "../treatement-delete";

type TreatmentFormProps = {
  treatmentName: string;
  setTreatmentName: (value: string) => void;
  treatmentCode: string; 
  setTreatmentCode: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
  cost: string;
  setCost: (value: string) => void;
  insuranceCoverage: string;
  setInsuranceCoverage: (value: string) => void;
  followUpCare: string;
  setFollowUpCare: (value: string) => void;
  riskBenefits: string;
  setRiskBenefits: (value: string) => void; 
  indications: string;
  setIndications: (value: string) => void; 
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: () => void;
  treatementId: string;
}

const UpdateTreatmentForm: React.FC<TreatmentFormProps> = React.memo(({
  treatmentName,setTreatmentName,
  treatmentCode, setTreatmentCode,
  description, setDescription,
  duration, setDuration,
  cost, setCost,
  insuranceCoverage, setInsuranceCoverage,
  followUpCare, setFollowUpCare,
  riskBenefits, setRiskBenefits,
  indications, setIndications,
  handleSubmit, handleDelete, treatementId
}) => {

  const formFields = [
    { label: "Treatment Name", id: "treatmentName", value: treatmentName, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTreatmentName(e.target.value) },
    { label: "Treatment Code", id: "treatmentCode", value: treatmentCode, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTreatmentCode(e.target.value) },
    { label: "Cost Amount", id: "cost", value: cost, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCost(e.target.value) },
  ]  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Treatment Information</h2>
      <div className="grid auto-rows-min md:grid-cols-3">
        {formFields.map(({ label, id, value, onChange }) => (
          <div key={id} className="grid w-full items-center gap-4 p-4">
            <Label htmlFor={id}>{label}:</Label>
            <Input type="text" id={id} value={value} onChange={onChange} />
          </div>
        ))}

       <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="description">Treatment Description:</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
          <Label htmlFor="duration">Duration:</Label>
          <Textarea id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}/>
          <Label htmlFor="insuranceCoverage">Insurance Coverage:</Label>
          <Textarea id="insuranceCoverage" value={insuranceCoverage} onChange={(e) => setInsuranceCoverage(e.target.value)}/>    
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="followUpCare">Follow Up Care:</Label>
          <Textarea id="followUpCare" value={followUpCare} onChange={(e) => setFollowUpCare(e.target.value)}/>
          <Label htmlFor="riskBenefits">Risk & Benefits:</Label>
          <Textarea id="riskBenefits" value={riskBenefits} onChange={(e) => setRiskBenefits(e.target.value)}/>
          <Label htmlFor="indications">Indications:</Label>
          <Textarea id="indications" value={indications} onChange={(e) => setIndications(e.target.value)}/>    
        </div>
      </div>
      <div className="flex pl-4 mt-4 ">
        <Button type="submit" className=" bg-orange-600 hover:bg-orange-700" aria-label="Update Treatment">Update Treatment</Button>
        <DeleteTreatmentDialog treatmentId={treatementId} onDelete={handleDelete} aria-label="Delete Treatment"/>
        <Link to={`/treatments`}>
          <Button className ="bg-gray-500 hover:bg-gray-600">
            Cancel
          </Button>
        </Link>
      </div>
    </form>  
  )
});

export default UpdateTreatmentForm