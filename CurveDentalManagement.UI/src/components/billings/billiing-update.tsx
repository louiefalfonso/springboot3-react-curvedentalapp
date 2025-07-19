import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import { format } from "date-fns";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { useDeleteBilling, useGetBillingById, useUpdateBilling } from "@/services/billing-services";
import { useGetAllPatients } from "@/services/patient-services";
import { useGetAllTreatments } from "@/services/treatment-services";
import UpdateBillingForm from "./form/update-form";

const UpdateBilling = () => {

  // get billing Id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch billing data
  const { data, isLoading } = useGetBillingById(id || "");
  const { mutate } = useUpdateBilling(id || "");
  const { mutate: deleteBilling } = useDeleteBilling();
  const { data: patients } = useGetAllPatients();
  const { data: treatments } = useGetAllTreatments();
  
  const [ paymentStatus, setPaymentStatus ] = useState<string>("");
  const [ totalAmount, setTotalAmount ] = useState<string>("");
  const [ paymentMethod, setPaymentMethod ] = useState<string>("");
  const [ remarks, setRemarks ] = useState<string>("");
  const [ billingDate, setBillingDate ] = useState<Date | undefined>(undefined);
  const [ paymentDate, setPaymentDate ] = useState<Date | undefined>(undefined);
  const [ treatmentId, setTreatmentId] = useState<number | null>(null);
  const [ patientId, setPatientId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setPaymentStatus(data.paymentStatus || "");
      setTotalAmount(data.totalAmount || "");
      setPaymentMethod(data.paymentMethod || "");
      setRemarks(data.remarks || "");
      setBillingDate(data.billingDate ? new Date(data.billingDate) : undefined);
      setPaymentDate(data.paymentDate ? new Date(data.paymentDate) : undefined);
      setTreatmentId(data.treatment.id);
      setPatientId(data.patient.id);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  // update billing
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (treatmentId === null) {
      toast.error("Please select a Treatment");
      return;
    }
    if (patientId === null) {
      toast.error("Please select a Patient");
      return;
    }
    const currentBilling = {
      id: id || "",
      paymentStatus,
      totalAmount,
      paymentMethod,
      remarks,
      billingDate: billingDate ? format(billingDate, "MM-dd-yyyy") : undefined,
      paymentDate: paymentDate ? format(paymentDate, "MM-dd-yyyy") : undefined,
      treatment: { id: treatmentId },
      patient: { id: patientId }    
    };

    try {
      mutate(currentBilling, {
        onSuccess: () => {
          toast.success("Billing Updated Successfully");
          navigate("/billings");
        },
        onError: (error) => {
          console.error("Error updating Billing:", error);
          toast.error("Error Updating Billing");
        }
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  
  }

  // delete billing
  const handleDelete = () => {
    try {
      deleteBilling(id || "", {
        onSuccess: () => {
          toast.success("Billing Deleted Successfully");
          navigate("/billings");
        },
        onError: (error) => {
          console.error("Error deleting billing:", error);
          toast.error("Failed to delete billing. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };



  return (
    <MainLayout>
      <Header Title="Update Appointment" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <UpdateBillingForm
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          totalAmount= {totalAmount}
          setTotalAmount={setTotalAmount}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          remarks={remarks}
          setRemarks={setRemarks}
          billingDate={billingDate}
          setBillingDate={setBillingDate}
          paymentDate={paymentDate}
          setPaymentDate={setPaymentDate}
          treatmentId={treatmentId}
          setTreatmentId={setTreatmentId}
          treatments={treatments}
          patientId={patientId}
          setPatientId={setPatientId}
          patients={patients}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          billingId={id || ""} 
          />
          <Toaster/>
        </div>
    </MainLayout>    
  )
}

export default UpdateBilling