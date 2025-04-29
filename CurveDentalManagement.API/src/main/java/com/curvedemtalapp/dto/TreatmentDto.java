package com.curvedemtalapp.dto;

import com.curvedemtalapp.entity.Doctor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TreatmentDto {

    private Long id;

    private String treatmentName;

    private String description;

    private String duration;

    private String cost;

    private String insuranceCoverage;

    private String followUpCare;

    private String riskBenefits;

    private String indications;

    private Doctor doctor;
}
