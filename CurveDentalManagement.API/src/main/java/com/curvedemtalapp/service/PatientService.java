package com.curvedemtalapp.service;

import com.curvedemtalapp.dto.PatientDto;

import java.util.List;

public interface PatientService {

    PatientDto createNewPatient(PatientDto patientDto);

    PatientDto getPatientById(Long patientId);

    List<PatientDto> getAllPatients();

    PatientDto updatePatient(Long patientId, PatientDto updatePatient);

    void deletePatient(Long patientId);
}
