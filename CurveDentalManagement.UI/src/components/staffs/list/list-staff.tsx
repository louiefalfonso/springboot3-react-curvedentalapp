import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const StaffDetailsList = ({ staffData }: { staffData: any }) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
        <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Staff Information</h2>
    </div>    
  )
}

export default StaffDetailsList