import React, { useState, useCallback, useMemo, } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Doctor = { id: number; firstName: string; lastName: string;}
type Patient = { id: number; firstName: string; lastName: string; }

type Appointment = {
    id: string;
    status: string;
    remarks: string;
    appointmentCode: string;
    appointmentTime: string;
    appointmentDate: Date;
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
    <div>AddNewAppointmentForm</div>
  )
}

export default AddNewAppointmentForm