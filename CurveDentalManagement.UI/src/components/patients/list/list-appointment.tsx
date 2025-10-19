import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface Appointment {
  id: number | string;
  status?: string;
  remarks?: string;
  appointmentCode?: string;
  appointmentTime?: string;
  appointmentDate?: string | Date | null;
  doctor?: { firstName?: string; lastName?: string } | null;
  patient?: { id?: number | string; firstName?: string; lastName?: string } | null;
}

const safeFormatDate = (input: string | Date | null | undefined) => {
  if (!input) return "";
  const d = new Date(input);
  return isNaN(d.getTime()) ? "" : format(d, "MM/dd/yyyy");
};

const PatientAppointment = ({ appointmentData }: { appointmentData: Appointment[] }) => {
  const hasData = Array.isArray(appointmentData) && appointmentData.length > 0;

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
            {hasData ? (
              appointmentData.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.appointmentCode || ""}</TableCell>
                  <TableCell>{safeFormatDate(appointment.appointmentDate)}</TableCell>
                  <TableCell>{appointment.appointmentTime || ""}</TableCell>
                  <TableCell>{appointment.status || ""}</TableCell>
                  <TableCell>{`${appointment.patient?.firstName || ""} ${appointment.patient?.lastName || ""}`.trim()}</TableCell>
                  <TableCell>
                    {`Dr. ${(appointment.doctor?.firstName || "").trim()} ${(appointment.doctor?.lastName || "").trim()}`.trim()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No Appointments Found for this patient yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientAppointment