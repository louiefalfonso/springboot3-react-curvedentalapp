package com.curvedemtalapp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PatientDto {

    private Long id;

    private String firstName;

    private String lastName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date dateOfBirth;

    private String gender;

    private String emailAddress;

    private String phoneNumber;

    private String address;

    private String insuranceDetails;

    private String insuranceProvider;

    private String insurancePolicyNumber;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date insuranceExpiryDate;
}
