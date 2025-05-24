import React, { useState, useCallback, useMemo, } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Doctor = { id: number; firstName: string; lastName: string;}
type Patient = { id: number; firstName: string; lastName: string; }

type Appointment = {
    id?: string;
    status: string;
    remarks: string;
    appointmentCode?: string;
    appointmentTime?: string;
    appointmentDate?: string;
    doctor: Doctor | null;
    patient: Patient | null;
}

interface AppointmentProps {
    doctors : Doctor[];
    patients: Patient[]
    onSubmit: (appointment:Appointment) => void;
}

const AddNewAppointmentForm: React.FC<AppointmentProps> = ({onSubmit, doctors, patients}) => {

  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [appointmentCode, setAppointmentCode] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

 const handleDoctorSelect = useCallback((doctorId: number) => {
    const doctor = doctors.find((doctor) => doctor.id === doctorId) || null;
    setSelectedDoctor(doctor);
 }, [doctors]);
 
 const handlePatientSelect = useCallback((patientId: number) => {
    const patient = patients.find((patient) => patient.id === patientId) || null;
    setSelectedPatient(patient);
 }, [patients]); 

const newAppointment = useMemo<Appointment>(
  () => ({
     appointmentDate: appointmentDate ? format(appointmentDate, "MM-dd-yyyy") : undefined,
     appointmentTime, appointmentCode,status, remarks,
     doctor: selectedDoctor,
     patient: selectedPatient,
  }),[appointmentDate, appointmentTime, appointmentCode, status, remarks, selectedDoctor, selectedPatient]
); 

const handleSubmit = (e:React.FormEvent) =>{
  e.preventDefault();
  
   if (!selectedDoctor) {
      toast.error("Please select a Doctor");
      return;
  }
  if (!selectedPatient) {
      toast.error("Please select a Patient");
      return;
  }

   onSubmit(newAppointment)
}

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Appointment Information</h2>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="appointmentCode">Appointment Code:</Label>
          <Input type="text" id="appointmentCode" placeholder="Appointment Code" onChange={(e) => setAppointmentCode(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="appointmentDate">Appointment Date:</Label>
          <Input type="date" id="appointmentDate" value={appointmentDate ? format(appointmentDate, "yyyy-MM-dd") : ""}
                onChange={(e) => { const selectedDate = e.target.value ? new Date(e.target.value) : null;
                  setAppointmentDate(selectedDate);
          }}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="appointmentTime">Appointment Time:</Label>
          <Input type="text" id="appointmentTime" placeholder="Appointment Time" onChange={(e) => setAppointmentTime(e.target.value)}/>
         </div>       
      </div>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="status">Status:</Label>
          <Textarea id="status" placeholder="Status" onChange={(e) => setStatus(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="remarks">Remarks:</Label>
          <Textarea id="remarks" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="doctor">Doctor:</Label>
          <Select onValueChange={(value) => handleDoctorSelect(parseInt(value))}>
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
          <Select onValueChange={(value) => handlePatientSelect(parseInt(value))}>
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
        <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600"> Add Appointment</Button>
        <Link to={`/appointments`}>
          <Button className ="bg-gray-500 hover:bg-gray-600">Back to Appointments</Button>  
        </Link>
      </div>
    </form>
  )
}

export default AddNewAppointmentForm