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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="/staffs" element={<StaffListsPage/>} />
        <Route path="/staffs/add" element={<AddNewStaff/>} />
        <Route path="/staffs/update/:id" element={<UpdateStaff/>} />

        <Route path="/patients" element={<PatientListsPage/>} /> 
        <Route path="/patients/add" element={<AddNewPatient/>} />
        <Route path="/patients/update/:id" element={<UpdatePatient/>} />
        
      </Routes>
      <Toaster />
    </>
  )
}

export default App
