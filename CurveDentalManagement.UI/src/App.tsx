import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import DashboardPage from './pages/dashboard/page';

import LoginPage from './pages/login/page';
import RegisterPage from './pages/register/page';
import ProtectedRoute from './services/protected-route';
import StaffListsPage from './pages/staffs/page';
import DoctorListsPage from './pages/doctors/page';
import PatientListsPage from './pages/patients/page';
import TreatmentListsPage from './pages/treatments/page';
import BillingsListPage from './pages/billings/page';
import AppointmentListsPage from './pages/appointments/page';
import AddNewDoctor from './components/doctors/doctor-add';
import DoctorDetails from './components/doctors/doctor-details';
import UpdateDoctor from './components/doctors/doctor-update';

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} replace/>} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={ <ProtectedRoute token={token}> <DashboardPage /> </ProtectedRoute> }/>
       
        <Route path='/doctors' element={ <ProtectedRoute token={token}><DoctorListsPage/></ProtectedRoute> }/>
        <Route path='/doctors/add' element={ <ProtectedRoute token={token}><AddNewDoctor/></ProtectedRoute> }/>
        <Route path='/doctors/details/:id' element={ <ProtectedRoute token={token}><DoctorDetails/></ProtectedRoute> }/>
        <Route path='/doctors/update/:id' element={ <ProtectedRoute token={token}><UpdateDoctor/></ProtectedRoute> }/>

        <Route path='/staffs' element={ <ProtectedRoute token={token}><StaffListsPage/></ProtectedRoute> }/>
        <Route path='/patients' element={ <ProtectedRoute token={token}><PatientListsPage/></ProtectedRoute> }/>
        <Route path='/treatments' element={ <ProtectedRoute token={token}><TreatmentListsPage/></ProtectedRoute> }/>
        <Route path='/billings' element={ <ProtectedRoute token={token}><BillingsListPage/></ProtectedRoute> }/>
        <Route path='/appointments' element={ <ProtectedRoute token={token}><AppointmentListsPage/></ProtectedRoute> }/>     
      </Routes>
      <Toaster />
    </>
  );
}

export default App;