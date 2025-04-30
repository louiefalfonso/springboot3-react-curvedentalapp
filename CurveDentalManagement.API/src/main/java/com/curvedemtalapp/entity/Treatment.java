package com.curvedemtalapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "treatments")
public class Treatment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String treatmentName;

    private String treatmentCode;

    private String description;

    private String duration;

    private BigDecimal cost;

    private String insuranceCoverage;

    private String followUpCare;

    private String riskBenefits;

    private String indications;

    @JsonIgnore
    @OneToMany(mappedBy = "treatment")
    private List<Doctor> doctors;

}
