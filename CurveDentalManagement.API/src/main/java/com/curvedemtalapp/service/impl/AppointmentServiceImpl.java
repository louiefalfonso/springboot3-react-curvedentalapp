package com.curvedemtalapp.service.impl;

import com.curvedemtalapp.dto.AppointmentDto;
import com.curvedemtalapp.entity.Appointment;
import com.curvedemtalapp.repository.AppointmentRepository;
import com.curvedemtalapp.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    // REST API - Get Appointment By ID
    @Override
    public AppointmentDto getAppointmentById(long appointmentId) {
        Appointment appointment = appointmentRepository.findAllById(appointmentId)
                .orElseThrow(()-> new RuntimeException("Appointment doesn't exist with a given Id:" + appointmentId));
        return modelMapper.map(appointment, AppointmentDto.class);
    }

    // REST API - Get All Appointments
    @Override
    public List<AppointmentDto> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.stream().map((appointment-> modelMapper.map(appointment, AppointmentDto.class)))
                .collect(Collectors.toList());
    }

    // REST API - Update Appointment
    @Override
    public AppointmentDto updateAppointment(Long appointmentId, AppointmentDto updateAppointment) {
        Appointment appointment = appointmentRepository.findAllById(appointmentId)
                .orElseThrow(()-> new RuntimeException("Appointment doesn't exist with a given Id:" + appointmentId));

        appointment.setStatus(updateAppointment.getStatus());
        appointment.setRemarks(updateAppointment.getRemarks());
        appointment.setAppointmentCode(updateAppointment.getAppointmentCode());
        appointment.setAppointmentTime(updateAppointment.getAppointmentTime());
        appointment.setAppointmentDate(updateAppointment.getAppointmentDate());
        appointment.setDoctor(updateAppointment.getDoctor());
        appointment.setPatient(updateAppointment.getPatient());

        Appointment updateAppointmentObj = appointmentRepository.save(appointment);
        return modelMapper.map(updateAppointmentObj, AppointmentDto.class);
    }

    // REST API - Delete Appointment
    @Override
    public void deleteAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findAllById(appointmentId)
                .orElseThrow(()-> new RuntimeException("Appointment doesn't exist with given id:" + appointmentId));
        appointmentRepository.deleteById(appointmentId);
    }
}
