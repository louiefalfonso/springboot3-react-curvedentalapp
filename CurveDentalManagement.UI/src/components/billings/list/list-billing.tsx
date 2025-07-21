import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

const BillingDetailsList = ({billingData}:{billingData:any}) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Billing Information</h2>
      <div className="min-w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Billing ID</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Billing Date</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Patient Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={billingData.id}>
              <TableCell>{billingData.id}</TableCell>
              <TableCell>{billingData.totalAmount}</TableCell>
              <TableCell>{billingData.paymentStatus}</TableCell>
              <TableCell>{billingData.paymentMethod}</TableCell>
              <TableCell>{format(new Date(billingData.billingDate), 'MM/dd/yyyy')}</TableCell>
              <TableCell>{format(new Date(billingData.paymentDate), 'MM/dd/yyyy')}</TableCell>
              <TableCell>{`${billingData.patient?.firstName} ${billingData.patient?.lastName}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default BillingDetailsList