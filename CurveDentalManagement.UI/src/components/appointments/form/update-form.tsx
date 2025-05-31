import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeleteAppointmentDialog from "../appointment-delete";

type Doctor = { id: number; firstName: string; lastName: string;}
type Patient = { id: number; firstName: string; lastName: string; }

type AppointmentFormProps = {
  status: string;
  setStatus: (value: string) => void;
  remarks: string;
  setRemarks: (value: string) => void;
  appointmentCode: string;
  setAppointmentCode: (value: string) => void;
  appointmentTime: string;
  setAppointmentTime: (value: string) => void;
  appointmentDate: Date | undefined;
  setAppointmentDate: (value: Date | undefined) => void;
  doctorId: number | null;
  setDoctorId: (value: number | null) => void;
  doctors: Doctor[] | undefined;
  patientId:number | null;
  setPatientId: (value: number | null) => void;
  patients: Patient[] | undefined;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: () => void;
  appointmentId: string;
}

const UpdateAppointmentForm:React.FC<AppointmentFormProps> = ({
  status, setStatus,
  remarks, setRemarks,
  appointmentCode, setAppointmentCode,
  appointmentTime, setAppointmentTime,
  appointmentDate, setAppointmentDate,
  doctorId, setDoctorId, doctors,
  patientId, setPatientId, patients,
  handleSubmit, handleDelete,appointmentId
}) => {

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Appointment Information</h2>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="appointmentCode">Appointment Code:</Label>
          <Input type="text" id="appointmentCode" value={appointmentCode} onChange={(e) => setAppointmentCode(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="appointmentDate">Appointment Date:</Label>
          <Input type="date" id="appointmentDate" value={appointmentDate ? format(appointmentDate, "yyyy-MM-dd") : ""}
                onChange={(e) => { const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                  setAppointmentDate(selectedDate);
          }}/> 
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="appointmentTime">Appointment Time:</Label>
          <Input type="text" id="appointmentTime" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)}/>
         </div>       
      </div>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="status">Status:</Label>
          <Textarea id="status" value={status} onChange={(e) => setStatus(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="remarks">Remarks:</Label>
          <Textarea id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="doctor">Doctor:</Label>
          <Select required value={doctorId ? doctorId.toString() : ""} onValueChange={(value) => {
            const parsedValue = parseInt(value);
            if (!isNaN(parsedValue)) {
                  setDoctorId(parsedValue);
                }
            }}
           >
          <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Doctor" />
          </SelectTrigger>
          <SelectContent>
              {doctors?.map((doctor: Doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id.toString()}>
                    Dr. {doctor.firstName} {doctor.lastName}
                  </SelectItem>
                ))}
            </SelectContent>
           </Select>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="patient">Patient:</Label>
          <Select required value={patientId ? patientId.toString() : ""} onValueChange={(value) => {
            const parsedValue = parseInt(value);
            if (!isNaN(parsedValue)) {
                  setPatientId(parsedValue);
                }
            }}
          >
          <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Patient" />
          </SelectTrigger>
          <SelectContent>
              {patients?.map((patient: Patient) => (
                  <SelectItem key={patient.id} value={patient.id.toString()}>
                    {patient.firstName} {patient.lastName}
                  </SelectItem>
                ))}
            </SelectContent>
           </Select>
        </div>
      </div>
      <div className="flex pl-4 mt-4 ">
          <Button type="submit" className="bg-orange-600 hover:bg-orange-700" aria-label="Update Appointment">Update Appointment</Button>
          <DeleteAppointmentDialog appointmentId={appointmentId} onDelete={handleDelete} aria-label="Delete Appointment"/>
          <Link to={`/appointments`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Appointments</Button>  
          </Link>
      </div>
    </form>
  )
}

export default UpdateAppointmentForm