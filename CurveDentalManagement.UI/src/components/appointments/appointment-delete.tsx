import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';


interface DeleteAppointmentDialogProps {
  appointmentId: string;
  onDelete: () => void;
}

const DeleteAppointmentDialog:React.FC<DeleteAppointmentDialogProps> = ({appointmentId, onDelete}) => {

  // Validate the appointment prop
  if (!appointmentId) {
      console.error("Invalid Appointment ID");
      return null;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="ml-2 mr-2 bg-rose-600 hover:bg-rose-700">Delete</Button>
      </DialogTrigger>
          <DialogContent>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to fully delete this appointment's information? This action cannot be undone.
            </DialogDescription>
            <DialogFooter>
              <Button onClick={onDelete} className="bg-rose-600 hover:bg-rose-700">
                Confirm
              </Button>
            </DialogFooter>
      </DialogContent>
  </Dialog>
  )
}

export default DeleteAppointmentDialog