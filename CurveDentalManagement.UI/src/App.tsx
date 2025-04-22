import './App.css'
import { Route, Routes } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"

import DashboardPage from './pages/dashboard/page';
import StaffListsPage from './pages/staffs/page';
import AddNewStaff from './components/staffs/staff-add';
import UpdateStaff from './components/staffs/staff-update';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="/staffs" element={<StaffListsPage/>} />
        <Route path="/staffs/add" element={<AddNewStaff/>} />
        <Route path="/staffs/update/:id" element={<UpdateStaff/>} />
        
      </Routes>
      <Toaster />
    </>
  )
}

export default App
