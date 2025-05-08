package com.curvedemtalapp.controller;

import com.curvedemtalapp.dto.AppointmentDto;
import com.curvedemtalapp.repository.AppointmentRepository;
import com.curvedemtalapp.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
