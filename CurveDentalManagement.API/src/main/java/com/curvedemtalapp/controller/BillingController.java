package com.curvedemtalapp.controller;

import com.curvedemtalapp.dto.BillingDto;
import com.curvedemtalapp.repository.BillingRepository;
import com.curvedemtalapp.service.BillingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/billings")
public class BillingController {

    private BillingRepository billingRepository;
    private BillingService billingService;

    //POST - Create New Billing REST API
    @PostMapping
    public ResponseEntity<BillingDto> createNewBilling(@RequestBody BillingDto billingDto){
        BillingDto savedBilling = billingService.createNewBilling(billingDto);
        return new ResponseEntity<>(savedBilling, HttpStatus.CREATED);
    }
}
