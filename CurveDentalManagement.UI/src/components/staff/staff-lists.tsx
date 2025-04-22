import { Link } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { useGetAllStaffs } from "@/services/staff-services";

const StaffLists = () => {

  // Declare state variables
  const { data, isLoading, refetch } = useGetAllStaffs();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  // Define Staff interface
  interface Staff {
    id: string; 
    firstName: string;
    lastName: string;
    staffRole: string;
    employeeNumber:string;
    email: string;
    gender: string;
    phoneNumber: string;
    age: string;
    address: string;
}

// Filter staff based on search query
const filteredStaffs: Staff[] = searchQuery
  ? data.filter((staff: Staff) =>
      staff.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.staffRole.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
  : data;

// Pagination
const totalPages = Math.ceil(filteredStaffs.length / itemsPerPage);
const paginatedStaffs = filteredStaffs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// Handle page change
const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
};

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-5">
          <Link to={`/staffs/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add Staff</Button>
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
                    <TableHead>Role / Position</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Address</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {paginatedStaffs.map((staff: Staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.firstName} {staff.lastName}</TableCell>
                <TableCell>{staff.staffRole}</TableCell>
                <TableCell>{staff.email}</TableCell> 
                <TableCell>{staff.phoneNumber}</TableCell>
                <TableCell>{staff.address}</TableCell>
                <TableCell>
                    <Link to={`/staffs/update/${staff.id}`}>
                        <Button className="bg-violet-500 hover:bg-violet-600">Update</Button>
                    </Link>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
        </Table>
        <div className="flex justify-center mt-4">
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
      <Toaster />
    </div> 
  )
}

export default StaffLists