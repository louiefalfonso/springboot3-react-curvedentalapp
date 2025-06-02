import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

const AppointmentDetailsList = ({appointmentData}:{appointmentData:any}) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Appointment Information</h2>
      <div className="min-w-full">
        <Table>
          <TableHeader>
            <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Appointment Date</TableHead>
                <TableHead>Scheduled Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Assigned Doctor</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={appointmentData.id}>
              <TableCell>{appointmentData.appointmentCode}</TableCell>
                <TableCell>{format(new Date(appointmentData.appointmentDate), 'MM/dd/yyyy')}</TableCell>
                <TableCell>{appointmentData.appointmentTime}</TableCell>
                <TableCell>{appointmentData.status}</TableCell>
                <TableCell>{`${appointmentData.patient?.firstName} ${appointmentData.patient?.lastName}`}</TableCell>
                <TableCell>Dr. {`${appointmentData.doctor?.firstName} ${appointmentData.doctor?.lastName}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AppointmentDetailsList