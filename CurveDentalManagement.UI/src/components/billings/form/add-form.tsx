import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Billing = {
    id: string;
    totalAmount: string;
    paymentStatus:string;
    paymentMethod: string;
    remarks: string;
    billingDate: Date;
    paymentDate: Date;
    patients: number[];
    treatments: number[];
}

interface AddBillingFormProps {
    onSubmit: (billing: Billing) => void;
    patients: { id: number; firstName: string; lastName: string }[] | undefined;
    treatments: { id: number; treatmentName: string; treatmentCode: string }[] | undefined;
}

const AddNewBillingForm:React.FC<AddBillingFormProps> = ({onSubmit, patients=[], treatments=[] }) => {

  // State for billing  details
  const [billingData, setBillingData] = useState<Billing>({
    id: "",
    totalAmount: "",
    paymentStatus: "",
    paymentMethod: "",
    remarks: "",
    billingDate: new Date(),
    paymentDate: new Date(),
    patients: [],
    treatments: [],
  });

  // Input handler for updating state 
    const handleInputChange = (field: keyof Billing, value: string | number[]) => { 
    setBillingData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>AddNewBillingForm</div>
  )
}

export default AddNewBillingForm