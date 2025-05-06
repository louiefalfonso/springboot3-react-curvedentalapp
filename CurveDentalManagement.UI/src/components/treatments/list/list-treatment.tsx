import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TreatmentDetailsList = ({treatmentData}:{treatmentData:any}) => {
  return (
    <>
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Doctor Information</h2>
      <div className="min-w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Treatment Code</TableHead>
              <TableHead>Treatment Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={treatmentData.id}>
            <TableCell>{treatmentData.treatmentCode}</TableCell>
            <TableCell>{treatmentData.treatmentName}</TableCell>
            </TableRow>
          </TableBody>
        </Table>        
      </div>
    </div>
    </>
  )
}

export default TreatmentDetailsList