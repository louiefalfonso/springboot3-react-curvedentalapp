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
import TreatmentListsPage from './pages/treatments/page';
import AddNewTreatment from './components/treatments/treatment-add';
import UpdateTreatment from './components/treatments/treatment-update';
import TreatmentDetails from './components/treatments/treatment-details';
import AppointmentListsPage from './pages/appointments/page';
import AddNewAppointment from './components/appointments/appointment-add';
import UpdateAppointment from './components/appointments/appointment-update';
import AppointmentDetails from './components/appointments/appointment-details';
import BillingsListPage from './pages/billings/page';
import AddNewBilling from './components/billings/billing-add';
import UpdateBilling from './components/billings/billiing-update';
import BillingDetails from './components/billings/billing-details';

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

        <Route path="/treatments" element={<TreatmentListsPage/>} />
        <Route path="/treatments/add" element={<AddNewTreatment/>} /> 
        <Route path="/treatments/update/:id" element={<UpdateTreatment/>} /> 
        <Route path="/treatments/details/:id" element={<TreatmentDetails/>} /> 

        <Route path="/appointments" element={<AppointmentListsPage/>} />
        <Route path="/appointments/add" element={<AddNewAppointment/>} />
        <Route path="/appointments/update/:id" element={<UpdateAppointment/>} />
        <Route path="/appointments/details/:id" element={<AppointmentDetails/>} />

        <Route path="/billings" element={<BillingsListPage/>} />
        <Route path="/billings/add" element={<AddNewBilling/>} />
        <Route path="/billings/update/:id" element={<UpdateBilling/>} />   
        <Route path="/billings/details/:id" element={<BillingDetails/>} />           
          
      </Routes>
      <Toaster />
    </>
  )
}

export default App
