import React from 'react'
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeleteBillingDialog from "../billing-delete";

type Patient = { id: number; firstName: string; lastName: string; }
type Treatment = { id: number; treatmentName: string; treatmentCode: string; }

 type BillingFormProps = {
  paymentStatus: string;
  setPaymentStatus: (value: string) => void;
  totalAmount: string;
  setTotalAmount: (value: string) => void;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  remarks: string;
  setRemarks: (value: string) => void;
  billingDate: Date | undefined;
  setBillingDate: (value: Date | undefined) => void;
  paymentDate: Date | undefined;
  setPaymentDate: (value: Date | undefined) => void;
  treatmentId: number | null;
  setTreatmentId: (value: number | null) => void;
  treatments: Treatment[] | undefined;
  patientId: number | null;
  setPatientId: (value: number | null) => void;
  patients: Patient[] | undefined;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: () => void;
  billingId: string;
 }

const UpdateBillingForm:React.FC<BillingFormProps> = ({
  paymentStatus, setPaymentStatus,
  totalAmount, setTotalAmount,
  paymentMethod, setPaymentMethod,
  remarks, setRemarks,
  billingDate, setBillingDate,
  paymentDate, setPaymentDate,
  treatmentId, setTreatmentId, treatments,
  patientId, setPatientId, patients,
  handleSubmit, handleDelete, billingId
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Billing Information</h2>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="paymentStatus">Payment Status:</Label>
          <Input type="text" id="paymentStatus" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="paymentMethod">Payment Method:</Label>
          <Input type="text" id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="totalAmount">Total Amount:</Label>
          <Input type="text" id="totalAmount" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="remarks">Remarks:</Label>
          <Textarea id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-2">
         <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="billingDate">Billing Date:</Label>
            <Input type="date" id="billingDate" value={billingDate ? format(billingDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => { const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                    setBillingDate(selectedDate);
            }}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="paymentDate">Payment Date:</Label>
            <Input type="date" id="paymentDate" value={paymentDate ? format(paymentDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => { const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                    setPaymentDate(selectedDate);
            }}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="patient">Patient:</Label>
          <Select required value={patientId ? patientId.toString() : ""} onValueChange={(value) => {
            const parsedValue = parseInt(value);
            if (!isNaN(parsedValue)) {
                  setPatientId(parsedValue);
                }
            }}
          >
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
          <Select required value={treatmentId ? treatmentId.toString() : ""} onValueChange={(value) => {
            const parsedValue = parseInt(value);
            if (!isNaN(parsedValue)) {
                  setTreatmentId(parsedValue);
                }
            }}
          >
          <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Treatment" />
          </SelectTrigger>
          <SelectContent>
              {treatments?.map((treatment: Treatment) => (
                  <SelectItem key={treatment.id} value={treatment.id.toString()}>
                    {treatment.treatmentCode} -  {treatment.treatmentName}
                  </SelectItem>
                ))}
            </SelectContent>
           </Select>
        </div>
      </div>
      <div className="flex pl-4 mt-4 ">
          <Button type="submit" className="bg-orange-600 hover:bg-orange-700" aria-label="Update Billing">Update Billing</Button>
          <DeleteBillingDialog billingId={billingId} onDelete={handleDelete} aria-label="Delete Billing"/>
          <Link to={`/billings`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Billings</Button>  
          </Link>
      </div>
    </form>
  )
}

export default UpdateBillingForm