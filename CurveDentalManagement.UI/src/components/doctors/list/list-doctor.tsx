import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DoctorDetailsList = ({ doctorData }: { doctorData: any }) => {
  return (
    <>
    <div className="rounded-md border p-5 w-full overflow-x-auto">
        <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Doctor Information</h2>
        <div className="min-w-full">
          <Table>
            <TableHeader>
              <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>License Number</TableHead>
                  <TableHead>Years Of Experience</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Department</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={doctorData.id}>
                <TableCell>Dr. {doctorData.firstName} {doctorData.lastName}</TableCell>
                <TableCell>{doctorData.email}</TableCell>
                <TableCell>{doctorData.contactNumber}</TableCell>
                <TableCell>{doctorData.licenseNumber}</TableCell>
                <TableCell>{doctorData.yearsOfExperience}</TableCell>
                <TableCell>{doctorData.specialization}</TableCell>  
                <TableCell>{doctorData.department}</TableCell>    
              </TableRow>    
            </TableBody>
          </Table>
        </div>
    </div>
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Professional Information</h2>
      <div className="min-w-full">
          <Table>
          <TableHeader>
            <TableRow>
                <TableHead>Schedule</TableHead>
                <TableHead>Dental School</TableHead>
                <TableHead>Office Address</TableHead>
                <TableHead>Emergency Contact</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={doctorData.id}>
              <TableCell>{doctorData.schedule}</TableCell>
              <TableCell>{doctorData. dentalSchool}</TableCell>  
              <TableCell>{doctorData.officeAddress}</TableCell>   
              <TableCell>{doctorData.emergencyContact}</TableCell>     
            </TableRow>    
          </TableBody>
          </Table>
        </div>
    </div>
    </>
  )
}

export default DoctorDetailsList