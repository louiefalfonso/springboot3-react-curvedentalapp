import React, { useState, useMemo } from "react";
import { format } from "date-fns";
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
  cost?: number;
  insuranceCoverage?: string;
  followUpCare?: string;
  riskBenefits?: string; 
  indications?: string;
}

interface TreatmentProps { onSubmit: (treatment: Treatment) => void; }

const AddNewTreatmentForm:React.FC<TreatmentProps> = ({onSubmit}) => {
  return (
    <div>AddNewTreatmentForm</div>
  )
}

export default AddNewTreatmentForm