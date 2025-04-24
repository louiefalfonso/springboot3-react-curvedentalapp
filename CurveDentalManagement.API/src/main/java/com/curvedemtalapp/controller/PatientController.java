package com.curvedemtalapp.controller;

import com.curvedemtalapp.dto.PatientDto;
import com.curvedemtalapp.entity.Patient;
import com.curvedemtalapp.repository.PatientRepository;
import com.curvedemtalapp.service.PatientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/patients")
public class PatientController {

    private PatientRepository patientRepository;
    private PatientService patientService;

    //POST - Create New Patient REST API
    @PostMapping
    public ResponseEntity<PatientDto> createNewPatient (@RequestBody PatientDto patientDto){
        PatientDto savedPatient = patientService.createNewPatient(patientDto);
        return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
    }

    //GET - Get Patient By ID REST API
    @GetMapping("{id}")
    public  ResponseEntity<Patient> getPatientById(@PathVariable  ("id") Long id){
        Patient patient = patientRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Patient does not exist with Id:" + id));
        return ResponseEntity.ok(patient);
    }

    //GET - Get All Patients REST API
    @GetMapping
    public ResponseEntity<List<PatientDto>> getAllPatients(){
        List<PatientDto> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    //UPDATE - Update Patient REST API
    @PutMapping("{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable ("id") long id,
                                                 @RequestBody Patient patientDetails){
        Patient updatePatient = patientRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Patient does not exist with id: " + id));

        updatePatient.setFirstName(patientDetails.getFirstName());
        updatePatient.setLastName(patientDetails.getLastName());
        updatePatient.setDateOfBirth(patientDetails.getDateOfBirth());
        updatePatient.setGender(patientDetails.getGender());
        updatePatient.setEmailAddress(patientDetails.getEmailAddress());
        updatePatient.setPhoneNumber(patientDetails.getPhoneNumber());
        updatePatient.setAddress(patientDetails.getAddress());
        updatePatient.setInsuranceDetails(patientDetails.getInsuranceDetails());
        updatePatient.setInsuranceProvider(patientDetails.getInsuranceProvider());
        updatePatient.setInsurancePolicyNumber(patientDetails.getInsurancePolicyNumber());
        updatePatient.setInsuranceExpiryDate(patientDetails.getInsuranceExpiryDate());

        patientRepository.save(updatePatient);
        return ResponseEntity.ok(updatePatient);
    }

    //DELETE - Delete Patient REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePatient(@PathVariable ("id") Long patientId){
        patientService.deletePatient(patientId);
        return ResponseEntity.ok("Patient Deleted Successfully");
    }
}
