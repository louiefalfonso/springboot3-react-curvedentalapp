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

