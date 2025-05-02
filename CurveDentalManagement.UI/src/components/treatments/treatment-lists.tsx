import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"

import { useGetAllTreatments } from "@/services/treatment-services";

const TreatmentLists = () => {

    // Declare state variables
    const { data, isLoading, refetch } = useGetAllTreatments()
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Handle loading state
    if (isLoading) { return <div>Loading...</div>;}
    if (!data) { return <div>No data found</div>;}

    interface Treatment {
      id: string;
      treatmentName: string;
      treatmentCode: string;
      description: string;
      duration: string;
      cost: number;
      insuranceCoverage: string;
      followUpCare: string;
      riskBenefits: string; 
      indications: string;
  }

  // Filter treatment based on search query
  const filteredTreatments: Treatment[] = searchQuery
  ? data.filter((treatment: Treatment) =>
      treatment.treatmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      treatment.treatmentCode.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : data;

  // Pagination
  const totalPages = Math.ceil(filteredTreatments.length / itemsPerPage);
  const paginatedTreatments = filteredTreatments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center pb-5 space-y-2 md:space-y-0 md:space-x-2">
          <Link to={`/doctors/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add New Treatment</Button>
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
                <TableHead>Treatment Code</TableHead>
                <TableHead>Treatment Name</TableHead>
                <TableHead>Duration</TableHead> 
                <TableHead>Indications</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
          {paginatedTreatments.map((treatment: Treatment) => (
            <TableRow key={treatment.id}>
              <TableCell>{treatment.treatmentCode}</TableCell>
              <TableCell>{treatment.treatmentName}</TableCell>
              <TableCell>{treatment.duration}</TableCell>    
              <TableCell>{treatment.indications}</TableCell>
       
              <TableCell>
                <Link to={`/treatments/details/${treatment.id}`}>
                    <Button className="mr-2 bg-sky-800 hover:bg-sky-950">View</Button>
                </Link>
                <Link to={`/treatments/update/${treatment.id}`}>
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

export default TreatmentLists