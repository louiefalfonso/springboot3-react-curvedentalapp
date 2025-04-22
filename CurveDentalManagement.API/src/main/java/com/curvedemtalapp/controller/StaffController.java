package com.curvedemtalapp.controller;

import com.curvedemtalapp.dto.StaffDto;
import com.curvedemtalapp.entity.Staff;
import com.curvedemtalapp.repository.StaffRepository;
import com.curvedemtalapp.service.StaffService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    //GET - Get Staff By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable ("id") Long id){
        Staff staff = staffRepository.findAllById(id)
                .orElseThrow(()->new RuntimeException("Staff does not exist with Id:" + id));
        return ResponseEntity.ok(staff);
    }

    //GET - Get All Staffs REST API
    @GetMapping
    public ResponseEntity<List<StaffDto>> getAllListedStaffs(){
        List<StaffDto> staffs = staffService.getAllListedStaffs();
        return ResponseEntity.ok(staffs);
    }

    //UPDATE - Update Staff REST API
    @PutMapping("{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable ("id") long id,
                                             @RequestBody Staff staffDetails){
        Staff updateStaff = staffRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Staff does not exist with id: " + id));

        updateStaff.setFirstName(staffDetails.getFirstName());
        updateStaff.setLastName(staffDetails.getLastName());
        updateStaff.setStaffRole(staffDetails.getStaffRole());
        updateStaff.setEmployeeNumber(staffDetails.getEmployeeNumber());
        updateStaff.setEmail(staffDetails.getEmail());
        updateStaff.setGender(staffDetails.getGender());
        updateStaff.setPhoneNumber(staffDetails.getPhoneNumber());
        updateStaff.setAge(staffDetails.getAge());
        updateStaff.setAddress(staffDetails.getAddress());

        staffRepository.save(updateStaff);
        return ResponseEntity.ok(updateStaff);
    }

    //DELETE - Delete Employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStaff(@PathVariable ("id") Long staffId){
        staffService.deleteStaff(staffId);
        return ResponseEntity.ok("Staff Deleted Successfully");
    }
}
