package com.curvedemtalapp.service.impl;

import com.curvedemtalapp.dto.StaffDto;
import com.curvedemtalapp.entity.Staff;
import com.curvedemtalapp.repository.StaffRepository;
import com.curvedemtalapp.service.StaffService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    // REST API - Get Staff By ID
    @Override
    public StaffDto geStaffById(Long staffId) {
        Staff staff = staffRepository.findAllById(staffId)
                .orElseThrow(()->new RuntimeException("Staff doesn't exist with a given Id:" + staffId));
        return modelMapper.map(staff, StaffDto.class);
    }

    // REST API - Get All Listed Staff
    @Override
    public List<StaffDto> getAllListedStaffs() {
        List<Staff> staffs = staffRepository.findAll();
        return staffs.stream().map((staff -> modelMapper.map(staff, StaffDto.class)))
                .collect(Collectors.toList());
    }

    // REST API - Update Staff
    @Override
    public StaffDto updateStaff(Long staffId, StaffDto updateStaff) {
        Staff staff = staffRepository.findAllById(staffId)
                .orElseThrow(()-> new RuntimeException("Staff doesn't exist with a given Id:" + staffId));

        staff.setFirstName(updateStaff.getFirstName());
        staff.setLastName(updateStaff.getLastName());
        staff.setStaffRole(updateStaff.getStaffRole());
        staff.setEmail(updateStaff.getEmail());
        staff.setGender(updateStaff.getGender());
        staff.setPhoneNumber(updateStaff.getPhoneNumber());
        staff.setAge(updateStaff.getAge());
        staff.setAddress(updateStaff.getAddress());

        Staff updateStaffObj = staffRepository.save(staff);
        return modelMapper.map(updateStaffObj, StaffDto.class);
    }

    // REST API - Delete Staff
    @Override
    public void deleteStaff(Long staffId) {
        Staff staff = staffRepository.findAllById(staffId)
                .orElseThrow(()->new RuntimeException("Staff doesn't exist with given id:" + staffId));
        staffRepository.deleteById(staffId);
    }
}
