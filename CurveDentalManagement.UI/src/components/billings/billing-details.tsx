import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetBillingById } from "@/services/billing-services";


const BillingDetails = () => {
  return (
    <div>BillingDetails</div>
  )
}

export default BillingDetails