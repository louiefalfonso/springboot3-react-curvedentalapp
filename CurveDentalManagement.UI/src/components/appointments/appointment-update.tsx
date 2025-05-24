import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import UpdateAppointmentForm from "./form/update-form";
import { useDeleteAppointment, useGetAppointmentById, useUpdateAppointment } from "@/services/appointment-services";

const UpdateAppointment = () => {
  // get treatement Id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch treatment data
  const { data, isLoading } = useGetAppointmentById(id || "");
  const { mutate } = useUpdateAppointment(id || "");
  const { mutate: deleteAppointment } = useDeleteAppointment();

  return (
     <MainLayout>
      <Header Title="Update Treatment" />
        <div className="flex flex-1 flex-col gap-4 p-4"></div>
    </MainLayout>    
  )
}

export default UpdateAppointment