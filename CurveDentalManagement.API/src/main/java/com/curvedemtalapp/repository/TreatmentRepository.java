package com.curvedemtalapp.repository;

import com.curvedemtalapp.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TreatmentRepository extends JpaRepository<Treatment, Long> {

    Optional<Treatment> findAllById(Long treatmentId);
}
