package com.curvedemtalapp.repository;

import com.curvedemtalapp.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findAllById(Long appointmentId);
}
