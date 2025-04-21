import './App.css'
import { Route, Routes } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/staffs" element={<div>Staffs</div>} />
        <Route path="/staffs/add" element={<div>Add Staff</div>} />
        <Route path="/staffs/:id" element={<div>Edit Staff</div>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
