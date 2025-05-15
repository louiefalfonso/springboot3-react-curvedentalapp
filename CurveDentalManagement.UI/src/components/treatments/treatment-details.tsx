import { useParams, Link } from "react-router-dom";
import Header from '../layout/header';
import MainLayout from '../layout/layout';
import { Button } from "@/components/ui/button";
import { useGetTreatmentById } from "@/services/treatment-services";
import TreatmentDetailsList from "./list/list-treatment";

const TreatmentDetails = () => {
  const { id } = useParams();
  const { data: treatmentData, isLoading: isTreatmentLoading, error: treatmentError } = useGetTreatmentById(id || "");

  if (isTreatmentLoading) {
    return <div>Loading...</div>;
  }

  if (treatmentError) {
    console.error('Error details:', { treatmentError });
    return <div>Error loading data. Please check the console for more details.</div>;
  }

  if (!treatmentData) {
    return <div>No Treatment Data Found</div>;
  }

  return (
    <MainLayout>
      <Header Title="Treatment Details" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <TreatmentDetailsList treatmentData={treatmentData} />
        <Link to={`/treatments`}>
          <Button className="bg-gray-500 hover:bg-gray-600">Back to Treatment List</Button>
        </Link>
      </div>
    </MainLayout>
  );
}

export default TreatmentDetails;