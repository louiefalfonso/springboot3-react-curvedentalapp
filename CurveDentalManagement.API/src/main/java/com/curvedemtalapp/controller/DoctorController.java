package com.curvedemtalapp.controller;

import com.curvedemtalapp.dto.DoctorDto;
import com.curvedemtalapp.entity.Doctor;
import com.curvedemtalapp.repository.DoctorRepository;
import com.curvedemtalapp.service.DoctorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/doctors")
public class DoctorController {

    private DoctorRepository doctorRepository;
    private DoctorService doctorService;

    //POST - Create New Doctor REST API
    @PostMapping
    public ResponseEntity<DoctorDto> createNewDoctor(@RequestBody DoctorDto doctorDto){
        DoctorDto savedDoctor = doctorService.createNewDoctor(doctorDto);
        return new ResponseEntity<>(savedDoctor, HttpStatus.CREATED);
    }

    //GET - Get Doctor By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable ("id") Long id){
        Doctor doctor = doctorRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Doctor does not exist with Id:" + id));
        return  ResponseEntity.ok(doctor);
    }

    //GET - Get All Doctors REST API
    @GetMapping
    public ResponseEntity<List<DoctorDto>> getAllDoctors(){
        List<DoctorDto> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    //UPDATE - Update Doctor REST API
    @PutMapping("{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable  ("id") long id,
                                               @RequestBody Doctor doctorDetails){
        Doctor updateDoctor = doctorRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Doctor does not exist with id: " + id));

        updateDoctor.setFirstName(doctorDetails.getFirstName());
        updateDoctor.setLastName(doctorDetails.getLastName());
        updateDoctor.setEmail(doctorDetails.getEmail());
        updateDoctor.setContactNumber(doctorDetails.getContactNumber());
        updateDoctor.setSpecialization(doctorDetails.getSpecialization());
        updateDoctor.setDepartment(doctorDetails.getDepartment());
        updateDoctor.setSchedule(doctorDetails.getSchedule());
        updateDoctor.setLicenseNumber(doctorDetails.getLicenseNumber());
        updateDoctor.setYearsOfExperience(doctorDetails.getYearsOfExperience());
        updateDoctor.setDentalSchool(doctorDetails.getDentalSchool());
        updateDoctor.setOfficeAddress(doctorDetails.getOfficeAddress());
        updateDoctor.setEmergencyContact(doctorDetails.getEmergencyContact());

        doctorRepository.save(updateDoctor);
        return  ResponseEntity.ok(updateDoctor);
    }

    //DELETE - Delete Doctor REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable ("id") Long doctorId){
        doctorService.deleteDoctor(doctorId);
        return  ResponseEntity.ok("Doctor Deleted Successfully");
    }
}
