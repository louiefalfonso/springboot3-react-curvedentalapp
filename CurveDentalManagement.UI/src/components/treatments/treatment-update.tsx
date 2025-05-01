import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import UpdateTreatmentForm from "./form/update-form";
import { useDeleteTreatment, useGetTreatmentById, useUpdateTreatment } from "@/services/treatment-services";

const UpdateTreatment = () => {

  // get treatement Id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch treatment data
  const { data, isLoading } = useGetTreatmentById(id || "");
  const { mutate } = useUpdateTreatment(id || "");
  const { mutate: deleteTreatment } = useDeleteTreatment();

  const [treatmentName, setTreatmentName] = useState("");
  const [treatmentCode, setTreatmentCode] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [cost, setCost] = useState("");
  const [insuranceCoverage, setInsuranceCoverage] = useState("");
  const [followUpCare, setFollowUpCare] = useState("");
  const [riskBenefits, setRiskBenefits] = useState("");
  const [indications, setIndications] = useState("");

  // set form values when data is fetched
  useEffect(()=>{
    if(data){
      setTreatmentName(data.treatmentName);
      setTreatmentCode(data.treatmentCode);
      setDescription(data.description);
      setDuration(data.duration);
      setCost(data.cost);
      setInsuranceCoverage(data.insuranceCoverage);
      setFollowUpCare(data.followUpCare);
      setRiskBenefits(data.riskBenefits)
      setIndications(data.indications)
    }
  }, [data])

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  // update treatment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(
      !treatmentCode || !treatmentName || !description ||
      !duration || !cost || !insuranceCoverage ||
      !followUpCare || !riskBenefits || !indications){
        {
          toast.error("Please fill in all required fields.");
          return;
        }
    }

    const currentTreatment ={
      id: id || "",
      treatmentName, treatmentCode, description,
      duration, cost, insuranceCoverage,
      followUpCare, riskBenefits, indications
    }

    try {
      mutate(currentTreatment, {
        onSuccess: () => {
          toast.success("Treatment Updated successfully");
          navigate("/treatments");
        },
        onError: (error) => {
          console.error("Error Updating Treatment:", error);
          toast.error("Error Updating Treatment");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
    
  }

  // delete treatment
  const handleDelete = () =>{
    try {
      deleteTreatment(id || "", {
        onSuccess: () => {
          toast.success("Treatment Deleted successfully");
          navigate("/treatments");
        },
        onError: (error) => {
          console.error("Error deleting Treatment:", error);
          toast.error("Failed to delete Treatment. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <MainLayout>
      <Header Title="Update Patient" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <UpdateTreatmentForm
            treatmentName={treatmentName}
            setTreatmentName={setTreatmentName}
            treatmentCode={treatmentCode} 
            setTreatmentCode={setTreatmentCode}
            description={description}
            setDescription={setDescription}
            duration={duration}
            setDuration={setDuration}
            cost={cost}
            setCost={setCost}
            insuranceCoverage={insuranceCoverage}
            setInsuranceCoverage={setInsuranceCoverage}
            followUpCare={followUpCare}
            setFollowUpCare={setFollowUpCare}
            riskBenefits={riskBenefits}
            setRiskBenefits={setRiskBenefits} 
            indications={indications}
            setIndications={setIndications} 
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            treatementId={id || ""}
          />
        </div>
      <Toaster />  
    </MainLayout>    
  )
}

export default UpdateTreatment