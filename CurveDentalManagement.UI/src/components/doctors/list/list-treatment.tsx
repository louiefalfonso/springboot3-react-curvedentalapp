import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Treatment = {
  id: number;
  treatmentName: string;
  treatmentCode: string;
  description: string;
  duration: string;
  cost: string;
  insuranceCoverage: string;
  followUpCare: string;
  riskBenefits: string; 
  indications: string;
  doctors: {
    id: number;
  };
}

const TreatmentRecordsTable = ({ treatmentData }: { treatmentData: Treatment[] | undefined }) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
          <div className="min-w-full">
            <h1 className="scroll-m-20 text-xl font-bold tracking-tight mb-5">Assiged Treatments:</h1>
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
                    {treatmentData && treatmentData.length > 0 ? (
                    treatmentData.map((treatment: Treatment) => (
                        <TableRow key={treatment.id}>
                        <TableCell>{treatment.treatmentCode}</TableCell>
                        <TableCell>{treatment.treatmentName}</TableCell>
                        <TableCell>{treatment.duration}</TableCell>
                        <TableCell>{treatment.cost}</TableCell>
                        <TableCell>{treatment.indications}</TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={5}>No Treatment Records Found</TableCell>
                    </TableRow>
                    )}
                 </TableBody>
            </Table>
           </div>
    </div>        
  )
}

export default TreatmentRecordsTable