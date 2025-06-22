import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { useGetAllBillings } from "@/services/billing-services";

const BillingsLists = () => {

  // declare state variables
  const { data, isLoading, refetch } = useGetAllBillings();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  interface Billing {
    id: string;
    totalAmount: string;
    paymentStatus: string;
    paymentMethod: string;
    remarks: string;
    billingDate: Date;
    paymentDate: Date;
    patients: number[];
    treatments: number[];
  }


  return (
    <div>BillingsLists</div>
  )
}

export default BillingsLists