import React, { useState, useCallback, useMemo, } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Patient = { id: number; firstName: string; lastName: string; }
type Treatment = { id: number; treatmentName: string; treatmentCode: string  }

type Billing = {
    id?: string;
    totalAmount?: string;
    paymentStatus?:string;
    paymentMethod?: string;
    remarks?: string;
    billingDate?: string;
    paymentDate?: string;
    patient: Patient | null;
    treatment: Treatment | null;
}

interface AddBillingFormProps {
    onSubmit: (billing: Billing) => void;
    patients: Patient [];
    treatments: Treatment [];
}

const AddNewBillingForm:React.FC<AddBillingFormProps> = ({onSubmit, patients, treatments}) => {

  const [totalAmount, setTotalAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [remarks, setRemarks] = useState("");
  const [billingDate, setBillingDate] = useState<Date | null>(null);
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const handlePatientSelect = useCallback((patientId: number) => {
    const patient = patients.find((patient) => patient.id === patientId) || null;
    setSelectedPatient(patient);
 }, [patients]); 

 const handleTreatmentSelect = useCallback((treatmentId: number) => {
    const treatment = treatments.find((treatment) => treatment.id === treatmentId) || null;
    setSelectedTreatment(treatment);
 }, [treatments]); 

  const newBilling = useMemo<Billing>(
    () => ({
        totalAmount, paymentStatus, paymentMethod, remarks,
        billingDate: billingDate ? format(billingDate, "MM-dd-yyyy") : undefined,
        paymentDate: paymentDate ? format(paymentDate, "MM-dd-yyyy") : undefined,
        patient: selectedPatient,
        treatment: selectedTreatment,
    }), [totalAmount, paymentStatus, paymentMethod, remarks, billingDate, paymentDate, selectedPatient, selectedTreatment]
  );

  const handleSubmit = (e:React.FormEvent) =>{
    e.preventDefault();
    
    if (!selectedTreatment) {
        toast.error("Please select a Treatment");
        return;
    }
    if (!selectedPatient) {
        toast.error("Please select a Patient");
        return;
    }

    onSubmit(newBilling)
  }


  return (
     <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Billing Information</h2>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="paymentStatus">Payment Status:</Label>
          <Input type="text" id="paymentStatus" placeholder="Payment Status" onChange={(e) => setPaymentStatus(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="paymentMethod">Payment Method:</Label>
          <Input type="text" id="paymentMethod" placeholder="Payment Method" onChange={(e) => setPaymentMethod(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="totalAmount">Total Amount:</Label>
          <Input type="text" id="totalAmount" placeholder="Total Amount" onChange={(e) => setTotalAmount(e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="remarks">Remarks:</Label>
          <Textarea id="remarks" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-2">
         <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="billingDate">Billing Date:</Label>
            <Input type="date" id="billingDate" value={billingDate ? format(billingDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => { const selectedDate = e.target.value ? new Date(e.target.value) : null;
                    setBillingDate(selectedDate);
            }}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="paymentDate">Payment Date:</Label>
            <Input type="date" id="paymentDate" value={paymentDate ? format(paymentDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => { const selectedDate = e.target.value ? new Date(e.target.value) : null;
                    setPaymentDate(selectedDate);
            }}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="patient">Patient:</Label>
          <Select onValueChange={(value) => handlePatientSelect(parseInt(value))}>
              <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Patient" />
              </SelectTrigger>
              <SelectContent>
                  {patients?.map((patient: Patient) => (
                    <SelectItem key={patient.id} value={patient.id.toString()}>
                      {patient.firstName} {patient.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
         <Label htmlFor="treatment">Treatment:</Label>
         <Select onValueChange={(value) => handleTreatmentSelect(parseInt(value))}>
              <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Treatment" />
              </SelectTrigger>
              <SelectContent>
                  {treatments?.map((treatment: Treatment) => (
                    <SelectItem key={treatment.id} value={treatment.id.toString()}>
                      {treatment.treatmentCode} - {treatment.treatmentName} 
                    </SelectItem>
                  ))}
                </SelectContent>
          </Select> 
        </div>
      </div>
      <div className="flex pl-4 mt-4">
        <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
          Add Billing
        </Button>
        <Link to={`/billings`}>
          <Button className="bg-gray-500 hover:bg-gray-600">Cancel</Button>
        </Link>
      </div>
     </form>
  )
}

export default AddNewBillingForm