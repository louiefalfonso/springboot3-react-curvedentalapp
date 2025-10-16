import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TreatmentDetailsList = ({treatmentData}:{treatmentData:any}) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Treatment Information</h2>
      <div className="min-w-full mt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Treatment Name</TableHead>
              <TableHead>Treatment Code</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Cost</TableHead>
            </TableRow>
          </ TableHeader>
          <TableBody>
            <TableRow key={treatmentData.id}>
              <TableCell>{treatmentData.treatmentName}</TableCell>
              <TableCell>{treatmentData.treatmentCode}</TableCell>
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
              <TableHead>Treatment Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={treatmentData.id}>
            <TableCell>{treatmentData.description}</TableCell>
            </TableRow>
          </TableBody>
        </Table> 
      </div>
      <div className="min-w-full mt-3">
       <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Insurance Coverage</TableHead>
            </TableRow>
          </TableHeader> 
          <TableBody>
            <TableRow key={treatmentData.id}>
              <TableCell>{treatmentData.insuranceCoverage}</TableCell>
            </TableRow>
          </TableBody>
        </Table>   
      </div>
      <div className="min-w-full mt-3">
       <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Follow Up Care</TableHead>
            </TableRow>
          </TableHeader> 
          <TableBody>
            <TableRow key={treatmentData.id}>
              <TableCell>{treatmentData.followUpCare}</TableCell>
            </TableRow>
          </TableBody>
        </Table>   
      </div>
      <div className="min-w-full mt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Risk & Benefits</TableHead>
            </TableRow>
          </TableHeader> 
          <TableBody>
            <TableRow key={treatmentData.id}>
              <TableCell>{treatmentData.riskBenefits}</TableCell>
            </TableRow>
          </TableBody>
        </Table>  
      </div>
      <div className="min-w-full mt-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Indications</TableHead>
            </TableRow>
          </TableHeader> 
          <TableBody>
            <TableRow key={treatmentData.id}>
              <TableCell>{treatmentData.indications}</TableCell>
            </TableRow>
          </TableBody>
        </Table>  
      </div>
    </div>
  )
}

export default TreatmentDetailsList