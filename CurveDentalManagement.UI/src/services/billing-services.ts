import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Billing {
    id: string;
    totalAmount?: string;
    paymentStatus?:string;
    paymentMethod?: string;
    remarks?: string;
    billingDate?: Date;
    paymentDate?: Date;
    patient?: number;
    treatments?: number;
 
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_BILLINGS

const billingServices = {

    addNewBilling: async (newBilling: Billing) => {
        const response = await axios.post(API_BASE_URL, newBilling);
        return response.data;
    },

    getAllBillings: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getBillingById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentBilling: async (currentBilling: Billing, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentBilling);
        return response.data;
    },

    deleteBilling: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
    
}

// React Query Hooks
export const useAddNewBilling = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newBilling: Billing) => billingServices.addNewBilling(newBilling),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['billings'] });
      },
    });
};

export const useGetAllBillings = () => {
    return useQuery( 
      { queryKey: ['billings'], queryFn: billingServices.getAllBillings });
}

export const useGetBillingById = (id: string) => {
    return useQuery(
      { queryKey: ['billing', id], queryFn: () => billingServices.getBillingById(id) });
}

export const useUpdateBilling = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentBilling: Billing) => billingServices.updateCurrentBilling(currentBilling, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['billing', id] });
      },
    });
};

export const useDeleteBilling = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => billingServices.deleteBilling(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['billings'] });
      },
    });
};

export default billingServices
