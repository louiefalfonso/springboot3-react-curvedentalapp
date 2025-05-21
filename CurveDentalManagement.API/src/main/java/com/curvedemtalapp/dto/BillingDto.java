package com.curvedemtalapp.dto;

import com.curvedemtalapp.entity.Treatment;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BillingDto {

    private Long id;

    private String totalAmount;

    private String paymentStatus;

    private String paymentMethod;

    private String remarks;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date billingDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date paymentDate;

    private List<Treatment> treatments;
}
