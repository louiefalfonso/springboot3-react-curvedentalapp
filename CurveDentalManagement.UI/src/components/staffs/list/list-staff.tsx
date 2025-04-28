import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const StaffDetailsList = ({ staffData }: { staffData: any }) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
        <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Staff Information</h2>
        <div className="min-w-full">
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Role / Position</TableHead>
                    <TableHead>Age</TableHead> 
                    <TableHead>Gender</TableHead>
                    <TableHead>Employee Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Home Address</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={staffData.id}>
                <TableCell>{staffData.firstName} {staffData.lastName}</TableCell>
                <TableCell>{staffData.staffRole}</TableCell>
                <TableCell>{staffData.age}</TableCell>
                <TableCell>{staffData.gender}</TableCell>
                <TableCell>{staffData.employeeNumber}</TableCell> 
                <TableCell>{staffData.email}</TableCell> 
                <TableCell>{staffData.phoneNumber}</TableCell>
                <TableCell>{staffData.address}</TableCell>
              </TableRow>
            </TableBody>
          </Table>  
        </div>
    </div>    
  )
}

export default StaffDetailsList