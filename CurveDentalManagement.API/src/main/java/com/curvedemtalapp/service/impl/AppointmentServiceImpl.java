package com.curvedemtalapp.service.impl;

import com.curvedemtalapp.dto.AppointmentDto;
import com.curvedemtalapp.entity.Appointment;
import com.curvedemtalapp.repository.AppointmentRepository;
import com.curvedemtalapp.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private AppointmentRepository appointmentRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Appointment
    @Override
    public AppointmentDto createNewAppointment(AppointmentDto appointmentDto) {
        Appointment appointment = modelMapper.map(appointmentDto, Appointment.class);
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return modelMapper.map(savedAppointment, AppointmentDto.class);
    }
}
