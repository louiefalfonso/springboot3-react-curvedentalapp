import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Treatment {
    id: string;
    treatmentName?: string;
    description?: string;
    duration?: string;
    cost?: number;
    insuranceCoverage?: string;
    followUpCare?: string;
    riskBenefits?: string; 
    indications?: string;
    doctor?: number;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_TREATMENTS;

const treatmentServices = {

    addNewTreatment: async (newTreatment: Treatment) => {
        const response = await axios.post(API_BASE_URL, newTreatment);
        return response.data;
    },

    getAllTreatments: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getTreatmentById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentTreatment: async (currentTreatment: Treatment, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentTreatment);
        return response.data;
    },

    deleteTreatment: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
}

// React Query Hooks
export const useAddNewTreatment = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newTreatment: Treatment) => treatmentServices.addNewTreatment(newTreatment),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['treatments'] });
      },
    });
};

export const useGetAllTreatments = () => {
    return useQuery( 
      { queryKey: ['treatments'], queryFn: treatmentServices.getAllTreatments });
};

export const useGetTreatmentById = (id: string) => {
    return useQuery(
      { queryKey: ['treatment', id], queryFn: () => treatmentServices.getTreatmentById(id) });
}

export const useUpdateTreatment = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentTreatment: Treatment) => treatmentServices.updateCurrentTreatment(currentTreatment, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['doctor', id] });
      },
    });
}

export const useDeleteTreatment = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => treatmentServices.deleteTreatment(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['treatments'] });
      },
    });
};
;

export default treatmentServices
