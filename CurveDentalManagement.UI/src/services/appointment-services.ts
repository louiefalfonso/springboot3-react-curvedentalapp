import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Appointment {
    id: string;
    status?: string;
    remarks?: string;
    appointmentCode?: string;
    appointmentTime?: string;
    appointmentDate?: Date;
    doctor?: number;
    patient ?: number;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_APPOINTMENTS;

const appointmentServices = {

    addNewAppointment: async (newAppointment: Appointment) => {
        const response = await axios.post(API_BASE_URL, newAppointment);
        return response.data;
    },

    getAllAppointments: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },
}

// React Query Hooks
export const useAddNewAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newAppointment: Appointment) => appointmentServices.addNewAppointment(newAppointment),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['appointments'] });
      },
    });
};

export const useGetAllAppointments = () => {
    return useQuery( 
      { queryKey: ['appointments'], queryFn: appointmentServices.getAllAppointments });
}

export default appointmentServices
