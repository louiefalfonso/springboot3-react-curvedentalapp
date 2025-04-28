import './App.css'
import { Route, Routes } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"

import DashboardPage from './pages/dashboard/page';
import StaffListsPage from './pages/staffs/page';
import AddNewStaff from './components/staffs/staff-add';
import UpdateStaff from './components/staffs/staff-update';
import PatientListsPage from './pages/patients/page';
import AddNewPatient from './components/patients/patient-add';
import UpdatePatient from './components/patients/patient-update';
import PatientDetails from './components/patients/patient-details';
import StaffDetails from './components/staffs/staff-details';
import DoctorListsPage from './pages/doctors/page';
import AddNewDoctor from './components/doctors/doctor-add';
import UpdateDoctor from './components/doctors/doctor-update';
import DoctorDetails from './components/doctors/doctor-details';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="/staffs" element={<StaffListsPage/>} />
        <Route path="/staffs/add" element={<AddNewStaff/>} />
        <Route path="/staffs/update/:id" element={<UpdateStaff/>} />
        <Route path="/staffs/details/:id" element={<StaffDetails/>} />

        <Route path="/patients" element={<PatientListsPage/>} /> 
        <Route path="/patients/add" element={<AddNewPatient/>} />
        <Route path="/patients/update/:id" element={<UpdatePatient/>} />
        <Route path="/patients/details/:id" element={<PatientDetails/>} />

        <Route path="/doctors" element={<DoctorListsPage/>} />
        <Route path="/doctors/add" element={<AddNewDoctor/>} />  
        <Route path="/doctors/update/:id" element={<UpdateDoctor/>} /> 
        <Route path="/doctors/details/:id" element={<DoctorDetails/>} /> 
        
      </Routes>
      <Toaster />
    </>
  )
}

export default App
