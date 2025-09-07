import axios from "axios";
import { useQuery } from '@tanstack/react-query'

const API_BASE_URL = import.meta.env.VITE_BASE_URI_AUTH;

interface User {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

const AuthService = {

  register(user: User) {
    return axios.post(`${API_BASE_URL}/signup`, user);
  },

  login(user: User) {
    return axios.post(`${API_BASE_URL}/login`, user);
  },

  getAllUsers(){
    return axios.get(`${API_BASE_URL}/users`);
  }
};

export const useGetAllUsers = () => {
    return useQuery( 
      { queryKey: ['users'], queryFn: AuthService.getAllUsers });
}

export default AuthService;