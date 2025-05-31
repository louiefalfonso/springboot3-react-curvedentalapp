import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import { format } from "date-fns";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import UpdateAppointmentForm from "./form/update-form";
import { useDeleteAppointment, useGetAppointmentById, useUpdateAppointment } from "@/services/appointment-services";
import { useGetAllPatients } from "@/services/patient-services";
import { useGetAllDoctors } from "@/services/doctor-services";

const UpdateAppointment = () => {
  // get treatement Id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch appointment data
  const { data, isLoading } = useGetAppointmentById(id || "");
  const { mutate } = useUpdateAppointment(id || "");
  const { mutate: deleteAppointment } = useDeleteAppointment();
  const { data: patients } = useGetAllPatients();
  const { data: doctors } = useGetAllDoctors();

  const [ status, setStatus ] = useState<string>("");
  const [ remarks, setRemarks ] = useState<string>("");
  const [ appointmentCode, setAppointmentCode ] = useState<string>("");
  const [ appointmentTime, setAppointmentTime ] = useState<string>("");
  const [ appointmentDate, setAppointmentDate ] = useState<Date | undefined>(undefined);
  const [ doctorId, setDoctorId] = useState<number | null>(null);
  const [ patientId, setPatientId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setStatus(data.status || "");
      setRemarks(data.remarks || "");
      setAppointmentCode(data.appointmentCode || "");
      setAppointmentTime(data.appointmentTime || "");
      setAppointmentDate(data.appointmentDate ? new Date(data.appointmentDate) : undefined);
      setDoctorId(data.doctor.id);
      setPatientId(data.patient.id);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;


   // update appointment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

      if (doctorId === null) {
        toast.error("Please select a Doctor");
        return;
      }
      if (patientId === null) {
        toast.error("Please select a Patient");
        return;
      }

    const currentAppointment = {
       id: id || "",
       status,
        remarks,
        appointmentCode,
        appointmentTime,
        appointmentDate: appointmentDate ? format(appointmentDate, "MM-dd-yyyy") : undefined,
        patient: { id: patientId },
        doctor: { id: doctorId }
    };

    try {
      mutate(currentAppointment, {
        onSuccess: () => {
          toast.success("Appointment Updated Successfully");
          navigate("/appointments");
        },
        onError: (error) => {
          console.error("Error Updating Appointment:", error);
          toast.error("Error Updating Appointment");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

   // delete appointment
  const handleDelete = () => {
    try {
      deleteAppointment(id || "", {
        onSuccess: () => {
          toast.success("Appointment Deleted successfully");
          navigate("/appointments");
        },
        onError: (error) => {
          console.error("Error deleting appointment:", error);
          toast.error("Failed to delete appoinment. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
     <MainLayout>
      <Header Title="Update Appointment" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <UpdateAppointmentForm
            status={status}
            setStatus={setStatus}
            remarks={remarks}
            setRemarks={setRemarks}
            appointmentCode={appointmentCode}
            setAppointmentCode={setAppointmentCode}
            appointmentTime={appointmentTime}
            setAppointmentTime={setAppointmentTime}
            appointmentDate={appointmentDate}
            setAppointmentDate={setAppointmentDate}
            doctorId={doctorId}
            setDoctorId={setDoctorId}
            doctors={doctors}
            patientId={patientId}
            setPatientId={setPatientId}
            patients={patients}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            appointmentId={id || ""}  
          />
          <Toaster/>
        </div>
    </MainLayout>    
  )
}

export default UpdateAppointment