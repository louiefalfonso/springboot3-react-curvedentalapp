package com.curvedemtalapp.service.impl;

import com.curvedemtalapp.dto.StaffDto;
import com.curvedemtalapp.entity.Staff;
import com.curvedemtalapp.repository.StaffRepository;
import com.curvedemtalapp.service.StaffService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StaffServiceImpl implements StaffService {

    private StaffRepository staffRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Staff
    @Override
    public StaffDto createNewStaff(StaffDto staffDto) {
        Staff staff = modelMapper.map(staffDto, Staff.class);
        Staff savedStaff = staffRepository.save(staff);
        return modelMapper.map(savedStaff, StaffDto.class);
    }

}