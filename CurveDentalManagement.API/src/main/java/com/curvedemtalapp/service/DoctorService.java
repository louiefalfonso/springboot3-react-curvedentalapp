package com.curvedemtalapp.service;

import com.curvedemtalapp.dto.DoctorDto;

import java.util.List;

public interface DoctorService {

    DoctorDto createNewDoctor(DoctorDto doctorDto);

    DoctorDto getDoctorById(Long doctorId);

    List<DoctorDto> getAllDoctors();

    DoctorDto updateDoctor(Long doctorId, DoctorDto updateDoctor);

    void  deleteDoctor (Long doctorId);
}
