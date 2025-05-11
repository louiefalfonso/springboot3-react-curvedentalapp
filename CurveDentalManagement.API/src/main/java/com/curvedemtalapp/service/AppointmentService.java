package com.curvedemtalapp.service;

import com.curvedemtalapp.dto.AppointmentDto;

import java.util.List;

public interface AppointmentService {

    AppointmentDto createNewAppointment(AppointmentDto appointmentDto);

    AppointmentDto getAppointmentById (long appointmentId);

    List<AppointmentDto> getAllAppointments();

    AppointmentDto updateAppointment(Long appointmentId, AppointmentDto updateAppointment);

    void deleteAppointment(Long appointmentId);
}
