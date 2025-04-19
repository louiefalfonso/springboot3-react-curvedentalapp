package com.curvedemtalapp.service;

import com.curvedemtalapp.dto.StaffDto;

import java.util.List;

public interface StaffService {

    StaffDto createNewStaff(StaffDto staffDto);

    StaffDto geStaffById(Long staffId);

    List<StaffDto> getAllListedStaffs();

    StaffDto updateStaff(Long staffId, StaffDto updateStaff);

    void deleteStaff(Long staffId);
}
