import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Doctor = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  specialization: string;
  department: string;
  schedule: string;
  licenseNumber: string;
  yearsOfExperience: string;
  dentalSchool: string;
  officeAddress: string;
  emergencyContact: string;
  treatments: {
    id: number;
  }
};

const DoctorRecordsTable = ({ doctorData }: { doctorData: Doctor[] | undefined }) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h1 className="scroll-m-20 text-xl font-bold tracking-tight mb-5">Assigned Doctors:</h1>
      <div className="min-w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Treatments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctorData && doctorData.length > 0 ? (
              doctorData.map((doctor: Doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>Dr. {doctor.firstName} {doctor.lastName}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.department}</TableCell>
                  <TableCell>{doctor.schedule}</TableCell>
                  <TableCell>{doctor.treatments.id}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No Doctor Records Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DoctorRecordsTable;