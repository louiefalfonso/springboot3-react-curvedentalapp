package com.curvedemtalapp.controller;

import com.curvedemtalapp.dto.AppointmentDto;
import com.curvedemtalapp.entity.Appointment;
import com.curvedemtalapp.repository.AppointmentRepository;
import com.curvedemtalapp.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/appointments")
public class AppointmentController {

    private AppointmentRepository appointmentRepository;
    private AppointmentService appointmentService;

    //POST - Create New Appointment REST API
    @PostMapping
    public ResponseEntity<AppointmentDto> createNewAppointment(@RequestBody AppointmentDto appointmentDto){
        AppointmentDto savedAppointment = appointmentService.createNewAppointment(appointmentDto);
        return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
    }

    //GET - Get Appointment By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable ("id") Long id){
        Appointment appointment = appointmentRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Appointment does not exist with Id:" + id));
        return ResponseEntity.ok(appointment);
    }

    //GET - Get All Appointments REST API
    @GetMapping
    public ResponseEntity<List<AppointmentDto>> getAllAppointments(){
        List<AppointmentDto> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    //UPDATE - Update Appointment REST API
    @PutMapping("{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable ("id") long id,
                                                         @RequestBody Appointment appointmentDetails){
        Appointment updateAppointment = appointmentRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Appointment does not exist with id: " + id));

        updateAppointment.setStatus(appointmentDetails.getStatus());
        updateAppointment.setRemarks(appointmentDetails.getRemarks());
        updateAppointment.setAppointmentCode(appointmentDetails.getAppointmentCode());
        updateAppointment.setAppointmentTime(appointmentDetails.getAppointmentTime());
        updateAppointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
        updateAppointment.setDoctor(appointmentDetails.getDoctor());
        updateAppointment.setPatient(appointmentDetails.getPatient());

        appointmentRepository.save(updateAppointment);
        return ResponseEntity.ok(updateAppointment);
    }

    //DELETE - Delete Appointment REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable ("id") Long appointmentId){
        appointmentService.deleteAppointment(appointmentId);
        return ResponseEntity.ok("Appointment Deleted Successfully");
    }
}
