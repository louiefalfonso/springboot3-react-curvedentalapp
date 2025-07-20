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
    patient: {firstName: string; lastName: string;} | null;
    treatments: number[];
  }

  // Filter based on search query
  const filteredBillings: Billing[] = searchQuery
    ? data.filter((billing: Billing) =>
        billing.patient?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        billing.patient?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        billing.treatments.some(treatment => treatment.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
        billing.totalAmount.toLowerCase().includes(searchQuery.toLowerCase()) ||
        billing.paymentStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        billing.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data; 

  // Pagination
  const totalPages = Math.ceil(filteredBillings.length / itemsPerPage);
  const paginatedBillings = filteredBillings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
    const handlePageChange = (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return;
      setCurrentPage(newPage);
  }

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center pb-5 space-y-2 md:space-y-0 md:space-x-2">
          <Link to={`/billings/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add New Billings</Button>
          </Link>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="p-2 border rounded"/>
            <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => { setSearchQuery(""); refetch(); }}> Clear Search</Button>
          </div>
      </div>
      <div className="min-w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Billing ID</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Billing Date</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Patient Name</TableHead>
            </TableRow>
          </TableHeader>
           <TableBody>
            {paginatedBillings.map((billing: Billing) => (
              <TableRow key={billing.id}>
                <TableCell>{billing.id}</TableCell>
                <TableCell>{billing.totalAmount}</TableCell>
                <TableCell>{billing.paymentStatus}</TableCell>
                <TableCell>{billing.paymentMethod}</TableCell>
                <TableCell>{new Date(billing.billingDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(billing.paymentDate).toLocaleDateString()}</TableCell>
                <TableCell>{`${billing.patient?.firstName } ${billing.patient?.lastName }`} </TableCell>
                <TableCell>
                  <Link to={`/billings/details/${billing.id}`}>
                    <Button className="mr-2 bg-sky-800 hover:bg-sky-950">View</Button>
                  </Link>
                  <Link to={`/billings/update/${billing.id}`}>
                    <Button className="mr-2 bg-orange-600 hover:bg-orange-700">Update</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
           </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
           <Pagination>
            <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)}/>
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(currentPage + 1)}/>
                </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default BillingsLists