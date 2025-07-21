import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TreatmentRecordsTable = ({ treatmentData }: { treatmentData: any }) => {
  return (
   <div className="rounded-md border p-5 w-full overflow-x-auto">
          <div className="min-w-full">
            <h1 className="scroll-m-20 text-xl font-bold tracking-tight mb-5">Assiged Treatment:</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Treatment Code</TableHead>
                        <TableHead>Treatment Name</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Indications</TableHead>
                    </TableRow>
                </TableHeader>
                 <TableBody> 
                          <TableRow key={treatmentData.id}>
                            <TableCell>{treatmentData.treatmentCode}</TableCell>
                            <TableCell>{treatmentData.treatmentName}</TableCell>
                            <TableCell>{treatmentData.duration}</TableCell>
                            <TableCell>{treatmentData.cost}</TableCell>
                            <TableCell>{treatmentData.indications}</TableCell>
                          </TableRow>
                 </TableBody>
            </Table>
           </div>
    </div> 
  )
}

export default TreatmentRecordsTable