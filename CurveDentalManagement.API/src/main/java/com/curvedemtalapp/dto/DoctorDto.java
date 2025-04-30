package com.curvedemtalapp.dto;

import com.curvedemtalapp.entity.Treatment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DoctorDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String contactNumber;

    private String specialization;

    private String department;

    private String schedule;

    private String licenseNumber;

    private String yearsOfExperience;

    private String dentalSchool;

    private String officeAddress;

    private String emergencyContact;

    private Treatment treatment;
}
