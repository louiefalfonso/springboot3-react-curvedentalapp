import './App.css';
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import DashboardPage from './pages/dashboard/page';
import StaffListsPage from './pages/staffs/page';
import AddNewStaff from './components/staffs/staff-add';
import UpdateStaff from './components/staffs/staff-update';
import StaffDetails from './components/staffs/staff-details';

import PatientListsPage from './pages/patients/page';
import AddNewPatient from './components/patients/patient-add';
import UpdatePatient from './components/patients/patient-update';
import PatientDetails from './components/patients/patient-details';

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
  const routes = [
    { path: "/", element: <DashboardPage /> },
    { path: "/staffs", element: <StaffListsPage /> },
    { path: "/staffs/add", element: <AddNewStaff /> },
    { path: "/staffs/update/:id", element: <UpdateStaff /> },
    { path: "/staffs/details/:id", element: <StaffDetails /> },
    { path: "/patients", element: <PatientListsPage /> },
    { path: "/patients/add", element: <AddNewPatient /> },
    { path: "/patients/update/:id", element: <UpdatePatient /> },
    { path: "/patients/details/:id", element: <PatientDetails /> },
    { path: "/doctors", element: <DoctorListsPage /> },
    { path: "/doctors/add", element: <AddNewDoctor /> },
    { path: "/doctors/update/:id", element: <UpdateDoctor /> },
    { path: "/doctors/details/:id", element: <DoctorDetails /> },
    { path: "/treatments", element: <TreatmentListsPage /> },
    { path: "/treatments/add", element: <AddNewTreatment /> },
    { path: "/treatments/update/:id", element: <UpdateTreatment /> },
    { path: "/treatments/details/:id", element: <TreatmentDetails /> },
    { path: "/appointments", element: <AppointmentListsPage /> },
    { path: "/appointments/add", element: <AddNewAppointment /> },
    { path: "/appointments/update/:id", element: <UpdateAppointment /> },
    { path: "/appointments/details/:id", element: <AppointmentDetails /> },
    { path: "/billings", element: <BillingsListPage /> },
    { path: "/billings/add", element: <AddNewBilling /> },
    { path: "/billings/update/:id", element: <UpdateBilling /> },
    { path: "/billings/details/:id", element: <BillingDetails /> },
  ];

  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;