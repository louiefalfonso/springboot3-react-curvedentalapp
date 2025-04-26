import { Link } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { useGetAllPatients } from "@/services/patient-services";

const PatientLists = () => {

   // Declare state variables
   const { data, isLoading, refetch } = useGetAllPatients();
   const [searchQuery, setSearchQuery] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  // Define Patient interface
  interface Patient {
      id: string; 
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
      age: string
      gender: string;
      emailAddress: string;
      phoneNumber: string;
      address: string;
      insuranceDetails: string;
      insuranceProvider: string;
      insurancePolicyNumber: string;
      insuranceExpiryDate: string;
  }

 // Filter staff based on search query
 const filteredPatients: Patient[] = searchQuery
  ? data.filter((patient: Patient) =>
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
  : data;

// Pagination
const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
const paginatedPatients = filteredPatients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// Handle page change
const handlePageChange = (newPage: number) => {
  if (newPage < 1 || newPage > totalPages) return;
  setCurrentPage(newPage);
};

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center pb-5 space-y-2 md:space-y-0 md:space-x-2">
          <Link to={`/patients/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add New Patient</Button>
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
                <TableHead>Full Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPatients.map((patient: Patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.firstName} {patient.lastName}</TableCell>
                <TableCell>{format(new Date(patient.dateOfBirth), 'MM/dd/yyyy')}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>{patient.emailAddress}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>
                  <Link to={`/patients/details/${patient.id}`}>
                    <Button className="mr-2 bg-sky-800 hover:bg-sky-950">View</Button>
                  </Link>
                  <Link to={`/patients/update/${patient.id}`}>
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

export default PatientLists