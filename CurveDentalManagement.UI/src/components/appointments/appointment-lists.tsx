import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { useGetAllAppointments } from "@/services/appointment-services";

const AppointmentLists = () => {

  // declare state variables
  const { data, isLoading, refetch } = useGetAllAppointments();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

 // Handle loading state
 if (isLoading) { return <div>Loading...</div>;}
 if (!data) { return <div>No data found</div>;}

 interface Appointment {
    id: number;
    status: string;
    remarks: string;
    appointmentCode: string;
    appointmentTime: string;
    appointmentDate: Date;
    doctor: {firstName: string; lastName: string;} | null;
    patient: {firstName: string; lastName: string;} | null;
 }

  // Filter based on search query
  const filteredAppointments: Appointment[] = searchQuery
    ? data.filter((appointment: Appointment) =>
        appointment.doctor?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.doctor?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.patient?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.patient?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.appointmentCode.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data;

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return;
      setCurrentPage(newPage);
  }

  return (
     <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center pb-5 space-y-2 md:space-y-0 md:space-x-2">
          <Link to={`/appointments/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add New Appointments</Button>
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
                <TableHead>Code</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Assigned Doctor</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAppointments.map((appointment: Appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.appointmentCode}</TableCell>
                <TableCell>{appointment.appointmentTime}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>{`${appointment.patient?.firstName} ${appointment.patient?.lastName}`}</TableCell>
                <TableCell>Dr. {`${appointment.doctor?.firstName} ${appointment.doctor?.lastName}`}</TableCell>
                <TableCell>
                  <Link to={`/appointmenta/details/${appointment.id}`}>
                    <Button className="mr-2 bg-sky-800 hover:bg-sky-950">View</Button>
                  </Link>
                  <Link to={`/appointments/update/${appointment.id}`}>
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

export default AppointmentLists