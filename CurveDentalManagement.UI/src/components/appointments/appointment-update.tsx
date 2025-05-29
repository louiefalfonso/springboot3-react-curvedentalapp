import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
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

  const [appointmentData , setAppointmentData] = useState({
    status: "",
    remarks: "",
    appointmentCode: "",
    appointmentTime: "",
    appointmentDate:"",
  });

  const [doctorIds, setDoctorIds] = useState<number[]>([]);
  const [patientIds, setPatientIds] = useState<number[]>([]);

  useEffect(() => {
    if (data) {
      setAppointmentData({
        status: data.status,
        remarks: data.remarks,
        appointmentCode: data.appointmentCode,
        appointmentTime: data.appointmentTime,
        appointmentDate: data.appointmentDate,
      });
      setDoctorIds(data.doctors.map((doctor: { id: number }) => doctor.id));
      setPatientIds(data.patients.map((patient: { id: number }) => patient.id));
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  const updateAppointmentData = (data: Partial<typeof appointmentData>) => {
    setAppointmentData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentAppointment = {
       id: id || "",
      ...appointmentData,
      doctors: doctorIds.map((id) => ({ id })),
      patients: patientIds.map((id) => ({ id })),
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
            appointmentData={appointmentData}
            setAppointmentData={updateAppointmentData}
            doctorIds={doctorIds}
            setDoctorIds={setDoctorIds}
            doctors={doctors}
            patientIds={patientIds}
            setPatientIds={setPatientIds}
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