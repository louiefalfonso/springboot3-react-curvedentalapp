import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllStaffs } from "@/services/staff-services";

const StaffLists = () => {

  // Declare state variables
  const { data, isLoading } = useGetAllStaffs();

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-5">
          <Link to={`/staffs/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add Staff</Button>
          </Link>
      </div>
    </div>  
  )
}

export default StaffLists