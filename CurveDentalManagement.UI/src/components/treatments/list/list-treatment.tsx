import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TreatmentDetailsList = ({treatmentData}:{treatmentData:any}) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Treatment Information</h2>
      <div className="min-w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Treatment Code</TableHead>
              <TableHead>Treatment Description</TableHead>
              <TableHead>Treatment Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={treatmentData.id}>
            <TableCell>{treatmentData.treatmentCode}</TableCell>
            <TableCell>{treatmentData.description}</TableCell>
            <TableCell>{treatmentData.treatmentName}</TableCell>
            <TableCell>{treatmentData.duration}</TableCell>
            <TableCell>{treatmentData.cost}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
              
      </div>
      <div className="min-w-full mt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Insurance Coverage</TableHead>
              <TableHead>Follow Up Care</TableHead>
              <TableHead>Risk & Benefits</TableHead>
              <TableHead>Indications</TableHead>
            </TableRow>
          </TableHeader> 
          <TableBody>
            <TableRow key={treatmentData.id}>
              <TableCell>{treatmentData.insuranceCoverage}</TableCell>
              <TableCell>{treatmentData.followUpCare}</TableCell>
              <TableCell>{treatmentData.riskBenefits}</TableCell>
              <TableCell>{treatmentData.indications}</TableCell>
            </TableRow>
          </TableBody>
        </Table>  
      </div>
    </div>
  )
}

export default TreatmentDetailsList