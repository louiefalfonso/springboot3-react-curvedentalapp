import './App.css'
import { Route, Routes } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import DashboardPage from './pages/dashboard/page';
import StaffListsPage from './pages/staffs/page';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />

        <Route path="/staffs" element={<StaffListsPage/>} />

        
        <Route path="/staffs/add" element={<div>Add Staff</div>} />
        <Route path="/staffs/:id" element={<div>Edit Staff</div>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
