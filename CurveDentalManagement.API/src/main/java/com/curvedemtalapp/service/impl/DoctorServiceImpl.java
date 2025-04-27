package com.curvedemtalapp.service.impl;

import com.curvedemtalapp.dto.DoctorDto;
import com.curvedemtalapp.repository.DoctorRepository;
import com.curvedemtalapp.service.DoctorService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private DoctorRepository doctorRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Patient
    @Override
    public DoctorDto createNewDoctor(DoctorDto doctorDto) {
        return null;
    }
}
