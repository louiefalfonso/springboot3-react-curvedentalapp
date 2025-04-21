import axios from "axios";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Staff {
    id: string; 
    firstName?: string;
    lastName?: string;
    staffRole?: string;
    email?: string;
    gender?: string;
    phoneNumber?: string;
    age?: string;
    address?: string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URI_STAFFS;

const staffServices = {

    addNewStaff: async (newStaff: Staff) => {
        const response = await axios.post(API_BASE_URL, newStaff);
        return response.data;
    },

    getAllStaffs: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getStaffById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    updateCurrentStaff: async (currentStaff: Staff, id: string) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, currentStaff);
        return response.data;
    },

    deleteStaff: async (id: string) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },

}

// React Query Hooks
export const useAddNewStaff = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newStaff: Staff) => staffServices.addNewStaff(newStaff),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['staffs'] });
      },
    });
};

export const useGetAllStaffs = () => {
    return useQuery( 
      { queryKey: ['staffs'], queryFn: staffServices.getAllStaffs });
  };

export const useGetStaffById = (id: string) => {
    return useQuery(
      { queryKey: ['staff', id], queryFn: () => staffServices.getStaffById(id) });
  }
export const useUpdateStaff = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (currentStaff: Staff) => staffServices.updateCurrentStaff(currentStaff, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['staff', id] });
      },
    });
  };

  export const useDeleteStaff = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => staffServices.deleteStaff(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['staffs'] });
      },
    });
  };

export default staffServices