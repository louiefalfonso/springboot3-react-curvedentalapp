import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Patient {
    id: string; 
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    age?: string
    gender?: string;
    emailAddress?: string;
    phoneNumber?: string;
    address?: string;
    insuranceDetails?: string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_PATIENTS;

const patientServices = {

    addNewPatient: async (newPatient: Patient) => {
        const response = await axios.post(API_BASE_URL, newPatient);
        return response.data;
    },

    getAllPatients: async () => {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    },

    getPatientById: async (id: string) => {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    },

    updateCurrentPatient: async (currentPatient: Patient, id: string) => {
      const response = await axios.put(`${API_BASE_URL}/${id}`, currentPatient);
      return response.data;
    },

    deletePatient: async (id: string) => {
      await axios.delete(`${API_BASE_URL}/${id}`);
   },

}

// React Query Hooks
export const useAddNewPatient = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newPatient: Patient) => patientServices.addNewPatient(newPatient),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['patients'] });
      },
    });
};

export const useGetAllPatients = () => {
  return useQuery( 
    { queryKey: ['patients'], queryFn: patientServices.getAllPatients });
};

export const useGetPatientById = (id: string) => {
  return useQuery(
    { queryKey: ['patient', id], queryFn: () => patientServices.getPatientById(id) });
}

export const useUpdatePatient = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (currentPatient: Patient) => patientServices.updateCurrentPatient(currentPatient, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', id] });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => patientServices.deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

export default patientServices;

