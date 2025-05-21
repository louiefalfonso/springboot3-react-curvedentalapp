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

    getAppointmentById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentAppointment: async (currentAppointment: Appointment, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentAppointment);
        return response.data;
    },

    deleteAppointment: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
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

export const useGetAppointmentById = (id: string) => {
    return useQuery(
      { queryKey: ['appointment', id], queryFn: () => appointmentServices.getAppointmentById(id) });
}

export const useUpdateAppointment = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentAppointment: Appointment) => appointmentServices.updateCurrentAppointment(currentAppointment, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['appointment', id] });
      },
    });
};

export const useDeleteAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => appointmentServices.deleteAppointment(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['appointments'] });
      },
    });
};

export default appointmentServices
