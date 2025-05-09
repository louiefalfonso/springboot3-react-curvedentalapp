package com.curvedemtalapp.dto;

import com.curvedemtalapp.entity.Doctor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TreatmentDto {

    private Long id;

    private String treatmentName;

    private String treatmentCode;

    private String description;

    private String duration;

    private String cost;

    private String insuranceCoverage;

    private String followUpCare;

    private String riskBenefits;

    private String indications;

    private List<Doctor> doctors;
}
