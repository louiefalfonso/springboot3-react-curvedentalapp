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
import AddNewPatient from './components/patients/patient-add';
import PatientDetails from './components/patients/patient-details';
import UpdatePatient from './components/patients/patient-update';
import UserListPage from './pages/users/page';
import TreatmentDetails from './components/treatments/treatment-details';
import UpdateTreatment from './components/treatments/treatment-update';
import AddNewTreatment from './components/treatments/treatment-add';
import AddNewStaff from './components/staffs/staff-add';
import StaffDetails from './components/staffs/staff-details';
import UpdateStaff from './components/staffs/staff-update';
import AddNewBilling from './components/billings/billing-add';
import BillingDetails from './components/billings/billing-details';
import UpdateBilling from './components/billings/billiing-update';
import AddNewAppointment from './components/appointments/appointment-add';
import AppointmentDetails from './components/appointments/appointment-details';
import UpdateAppointment from './components/appointments/appointment-update';

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} replace/>} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={ <ProtectedRoute token={token}><DashboardPage /></ProtectedRoute> }/>
       
        <Route path='/doctors' element={ <ProtectedRoute token={token}><DoctorListsPage/></ProtectedRoute> }/>
        <Route path='/doctors/add' element={ <ProtectedRoute token={token}><AddNewDoctor/></ProtectedRoute> }/>
        <Route path='/doctors/details/:id' element={ <ProtectedRoute token={token}><DoctorDetails/></ProtectedRoute> }/>
        <Route path='/doctors/update/:id' element={ <ProtectedRoute token={token}><UpdateDoctor/></ProtectedRoute> }/>

        <Route path='/patients' element={ <ProtectedRoute token={token}><PatientListsPage/></ProtectedRoute> }/>
        <Route path='/patients/add' element={ <ProtectedRoute token={token}><AddNewPatient/></ProtectedRoute> }/>
        <Route path='/patients/details/:id' element={ <ProtectedRoute token={token}><PatientDetails/></ProtectedRoute> }/>
        <Route path='/patients/update/:id' element={ <ProtectedRoute token={token}><UpdatePatient/></ProtectedRoute> }/>

        <Route path='/staffs' element={ <ProtectedRoute token={token}><StaffListsPage/></ProtectedRoute> }/>
        <Route path='/staffs/add' element={ <ProtectedRoute token={token}><AddNewStaff/></ProtectedRoute> }/>
        <Route path='/staffs/details/:id' element={ <ProtectedRoute token={token}><StaffDetails/></ProtectedRoute> }/>
        <Route path='/staffs/update/:id' element={ <ProtectedRoute token={token}><UpdateStaff/></ProtectedRoute> }/>

        <Route path='/treatments' element={ <ProtectedRoute token={token}><TreatmentListsPage/></ProtectedRoute> }/>
        <Route path='/treatments/add' element={ <ProtectedRoute token={token}><AddNewTreatment/></ProtectedRoute> }/>
        <Route path='/treatments/:id' element={ <ProtectedRoute token={token}><TreatmentListsPage/></ProtectedRoute> }/>
        <Route path='/treatments/details/:id' element={ <ProtectedRoute token={token}><TreatmentDetails/></ProtectedRoute> }/>
        <Route path='/treatments/update/:id' element={ <ProtectedRoute token={token}><UpdateTreatment/></ProtectedRoute> }/>
      
        <Route path='/billings' element={ <ProtectedRoute token={token}><BillingsListPage/></ProtectedRoute> }/>
        <Route path='/billings/aa' element={ <ProtectedRoute token={token}><AddNewBilling/></ProtectedRoute> }/>
        <Route path='/billings/details/:id' element={ <ProtectedRoute token={token}><BillingDetails/></ProtectedRoute> }/>
        <Route path='/billings/update/:id' element={ <ProtectedRoute token={token}><UpdateBilling/></ProtectedRoute> }/>

        <Route path='/appointments' element={ <ProtectedRoute token={token}><AppointmentListsPage/></ProtectedRoute> }/>
        <Route path='/appointments/add' element={ <ProtectedRoute token={token}><AddNewAppointment/></ProtectedRoute> }/> 
        <Route path='/appointments/details/:id' element={ <ProtectedRoute token={token}><AppointmentDetails/></ProtectedRoute> }/>   
        <Route path='/appointments/update/:id' element={ <ProtectedRoute token={token}><UpdateAppointment/></ProtectedRoute> }/>

        <Route path='/users' element={ <ProtectedRoute token={token}><UserListPage/></ProtectedRoute> }/> 
      </Routes>
      <Toaster />
    </>
  );
}

export default App;