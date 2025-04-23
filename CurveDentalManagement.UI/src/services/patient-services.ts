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

export default patientServices;

