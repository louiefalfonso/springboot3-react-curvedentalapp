import React from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DeleteDoctorDialog from "../doctor-delete";

type DoctorFormProps = {
  doctorData: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    specialization: string;
    department: string;
    schedule: string;
    licenseNumber: string;
    yearsOfExperience: string;
    dentalSchool: string;
    officeAddress: string;
    emergencyContact: string;
  };
  setDoctorData: (data: Partial<DoctorFormProps["doctorData"]>) => void;
  treatmentIds: number[];
  setTreatmentIds: (value: number[]) => void;
  treatments: { id: number; treatmentName: string }[] | undefined;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: () => void;
  doctorId: string;
};

const UpdateDoctorForm: React.FC<DoctorFormProps> = React.memo(({
  doctorData,
  setDoctorData,
  treatmentIds = [],
  setTreatmentIds,
  treatments = [],
  handleSubmit,
  handleDelete,
  doctorId,
}) => {
  
  // Define form fields dynamically
  const formFields = [
    { label: "First Name", id: "firstName", value: doctorData.firstName },
    { label: "Last Name", id: "lastName", value: doctorData.lastName },
    { label: "Specialization", id: "specialization", value: doctorData.specialization },
    { label: "Phone Number", id: "contactNumber", value: doctorData.contactNumber },
    { label: "Email Address", id: "email", value: doctorData.email },
    { label: "Department", id: "department", value: doctorData.department },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">
        Doctor Information
      </h2>
      <div className="grid auto-rows-min md:grid-cols-3">
        {formFields.map(({ label, id, value }) => (
          <div key={id} className="grid w-full items-center gap-4 p-4">
            <Label htmlFor={id}>{label}:</Label>
            <Input
              type="text"
              id={id}
              value={value}
              onChange={(e) => setDoctorData({ [id]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">
        Professional Information
      </h2>
      <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="treatment">Treatments:</Label>
          <Select isMulti
            options={treatments?.map((treatment) => ({
                value: treatment.id,
                label: treatment.treatmentName,
            }))}
            value={treatmentIds.map((id) => ({
                value: id,
                label: treatments?.find((treatment) => treatment.id === id)?.treatmentName,
            }))}
            onChange={(selectedOptions) => {
                if (selectedOptions) {
                setTreatmentIds(selectedOptions.map((option) => option.value));
                } else {
                setTreatmentIds([]); 
                }
            }}
             classNamePrefix="custom-select"
            />
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="licenseNumber">License Number:</Label>
          <Input
            type="text"
            id="licenseNumber"
            value={doctorData.licenseNumber}
            onChange={(e) => setDoctorData({ licenseNumber: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="yearsOfExperience">Years Of Experience:</Label>
          <Input
            type="text"
            id="yearsOfExperience"
            value={doctorData.yearsOfExperience}
            onChange={(e) => setDoctorData({ yearsOfExperience: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="dentalSchool">Dental School:</Label>
          <Input
            type="text"
            id="dentalSchool"
            value={doctorData.dentalSchool}
            onChange={(e) => setDoctorData({ dentalSchool: e.target.value })}
          />
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="schedule">Schedule:</Label>
          <Textarea
            id="schedule"
            value={doctorData.schedule}
            onChange={(e) => setDoctorData({ schedule: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="officeAddress">Office Address:</Label>
          <Textarea
            id="officeAddress"
            value={doctorData.officeAddress}
            onChange={(e) => setDoctorData({ officeAddress: e.target.value })}
          />
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="emergencyContact">Emergency Contact:</Label>
          <Textarea
            id="emergencyContact"
            value={doctorData.emergencyContact}
            onChange={(e) => setDoctorData({ emergencyContact: e.target.value })}
          />
        </div>
      </div>
      <div className="flex pl-4 mt-4">
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700" aria-label="Update Doctor">
          Update Doctor
        </Button>
        <DeleteDoctorDialog doctorId={doctorId} onDelete={handleDelete} />
        <Link to={`/doctors`}>
          <Button className="bg-gray-600 hover:bg-gray-700">Cancel</Button>
        </Link>
      </div>
    </form>
  );
});

export default UpdateDoctorForm;