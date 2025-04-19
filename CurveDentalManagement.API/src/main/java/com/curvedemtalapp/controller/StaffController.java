package com.curvedemtalapp.controller;

import com.curvedemtalapp.dto.StaffDto;
import com.curvedemtalapp.repository.StaffRepository;
import com.curvedemtalapp.service.StaffService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/staffs")
public class StaffController {

    private StaffRepository staffRepository;
    private StaffService staffService;

    //POST - Create New Staff REST API
    @PostMapping
    public ResponseEntity<StaffDto> createNewStaff(@RequestBody StaffDto staffDto){
        StaffDto savedStaff = staffService.createNewStaff(staffDto);
        return  new ResponseEntity<>(savedStaff, HttpStatus.CREATED);
    }
}
