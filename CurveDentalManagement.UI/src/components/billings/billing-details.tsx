import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetBillingById } from "@/services/billing-services";
import BillingDetailsList from "./list/list-billing";
import PatientListTable from "./list/list-patients";
import TreatmentRecordsTable from "./list/list-treatment";

const BillingDetails = () => {

  const { id } = useParams();
  const { data: billingData, isLoading: isBillingLoading, error: billingError } = useGetBillingById(id || "");

  // Filter billing for the specific patient
  const patientBilling = useMemo(() => {
    if(!billingData || !billingData.patient) return[];
    return billingData.patient;
  }, [billingData]);

   // Filter billing for the specific treatment
  const treatmentBilling = useMemo(() => {
    if(!billingData || !billingData.treatment) return[];
    return billingData.treatment;
  }, [billingData]);

  if (isBillingLoading) {
    return <div>Loading...</div>;
  }

  if (billingError) {
    console.error('Error details:', { billingError });
    return <div>Error loading data. Please check the console for more details.</div>;
  }

  if (!billingData) {
    return <div>No Billing Data Found</div>;
  }
  return (
    <MainLayout>
      <Header Title="Billing Details" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <BillingDetailsList billingData={billingData} />
        <PatientListTable patientData={patientBilling} />
        <TreatmentRecordsTable treatmentData={treatmentBilling} />
        <Link to={`/billings`}>
          <Button className="bg-gray-600 hover:bg-gray-700">Back to Billing List</Button>
        </Link>
      </div>
    </MainLayout>
  )
}

export default BillingDetails