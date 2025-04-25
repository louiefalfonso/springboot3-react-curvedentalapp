import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns"

const PatientDetailsList = ({ patientData }: { patientData: any }) => {
  return (
    <>
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Patient Information</h2>
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
            <TableRow key={patientData.id}>
              <TableCell>{patientData.firstName} {patientData.lastName}</TableCell>
              <TableCell>{format(new Date(patientData.dateOfBirth), 'dd/MM/yyyy')}</TableCell>
              <TableCell>{patientData.age}</TableCell>
              <TableCell>{patientData.gender}</TableCell>  
              <TableCell>{patientData.phoneNumber}</TableCell>  
              <TableCell>{patientData.emailAddress}</TableCell> 
              <TableCell>{patientData.address}</TableCell> 
            </TableRow> 
          </TableBody>
        </Table>
      </div>   
    </div>
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Insurance Information</h2> 
      <div className="min-w-full">
      <Table>
          <TableHeader>
            <TableRow>
                <TableHead>Insurance Provider</TableHead>
                <TableHead>Insurance Policy Number</TableHead>
                <TableHead>Insurance Expiry Date</TableHead>
                <TableHead>Insurance Details</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={patientData.id}>
              <TableCell>{patientData.insuranceProvider}</TableCell>
              <TableCell>{patientData.insurancePolicyNumber}</TableCell> 
              <TableCell>{format(new Date(patientData.insuranceExpiryDate), 'dd/MM/yyyy')}</TableCell>
              <TableCell>{patientData.insuranceDetails}</TableCell>
            </TableRow>
          </TableBody>  
        </Table>   
      </div>
    </div>
    </>
  )
}

export default PatientDetailsList

