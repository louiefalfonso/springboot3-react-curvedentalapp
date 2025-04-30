import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { useGetAllDoctors } from "@/services/doctor-services";
const DoctorLists = () => {
  // declare state variables
  const { data, isLoading, refetch } = useGetAllDoctors();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  interface Doctor {
    id: string; 
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    specialization: string;
    department: string;
    schedule: string;
    licenseNumber: string;
    yearsOfExperience: string;
    dentalSchool: string;
    officeAddress: string;
    emergencyContact: string;
}

 // Filter doctor based on search query
 const filteredDoctors: Doctor[] = searchQuery
  ? data.filter((doctor: Doctor) =>
      doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : data;

  // Pagination
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredDoctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center pb-5 space-y-2 md:space-y-0 md:space-x-2">
          <Link to={`/doctors/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add New Doctor</Button>
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
                <TableHead>Specialization</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Schedule</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDoctors.map((doctor: Doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>Dr. {doctor.firstName} {doctor.lastName}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.contactNumber}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.schedule}</TableCell>
                <TableCell>
                  <Link to={`/doctors/details/${doctor.id}`}>
                    <Button className="mr-2 bg-sky-800 hover:bg-sky-950">View</Button>
                  </Link>
                  <Link to={`/doctors/update/${doctor.id}`}>
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

export default DoctorLists