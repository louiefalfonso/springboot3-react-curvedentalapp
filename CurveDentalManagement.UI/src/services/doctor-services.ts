import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Doctor {
    id: string; 
    firstName?: string;
    lastName?: string;
    email?: string;
    contactNumber?: string;
    specialization?: string;
    department?: string;
    schedule?: string;
    licenseNumber?: string;
    yearsOfExperience?: string;
    dentalSchool?: string;
    officeAddress?: string;
    emergencyContact?: string;
    treatment?: number; 
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_DOCTORS;

const doctorServices = {

    addNewDoctor: async (newDoctor: Doctor) => {
        const response = await axios.post(API_BASE_URL, newDoctor);
        return response.data;
    },

    getAllDoctors: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getDoctorById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },
  
    updateCurrentDoctor: async (currentDoctor: Doctor, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentDoctor);
        return response.data;
    },
  
    deleteDoctor: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddNewDoctor = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newDoctor: Doctor) => doctorServices.addNewDoctor(newDoctor),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['doctors'] });
      },
    });
};

export const useGetAllDoctors = () => {
    return useQuery( 
      { queryKey: ['doctors'], queryFn: doctorServices.getAllDoctors });
};

export const useGetDoctorById = (id: string) => {
    return useQuery(
      { queryKey: ['doctor', id], queryFn: () => doctorServices.getDoctorById(id) });
}

export const useUpdateDoctor = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentDoctor: Doctor) => doctorServices.updateCurrentDoctor(currentDoctor, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['doctor', id] });
      },
    });
};

export const useDeleteDoctor = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => doctorServices.deleteDoctor(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['doctors'] });
      },
    });
};

export default doctorServices;

