package com.curvedemtalapp.dto;

import com.curvedemtalapp.entity.Doctor;
import com.curvedemtalapp.entity.Patient;
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
public class AppointmentDto {

    private Long id;

    private String status;

    private String remarks;

    private String appointmentCode;

    private String appointmentTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date appointmentDate;

    private Doctor doctor;

    private Patient patient;
}
