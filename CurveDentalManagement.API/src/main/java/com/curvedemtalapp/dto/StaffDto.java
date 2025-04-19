package com.curvedemtalapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StaffDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String staffRole;

    private String email;

    private String gender;

    private String phoneNumber;

    private String age;

    private String address;
}
