package com.curvedemtalapp.controller;

import com.curvedemtalapp.dto.BillingDto;
import com.curvedemtalapp.entity.Billing;
import com.curvedemtalapp.repository.BillingRepository;
import com.curvedemtalapp.service.BillingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    //GET - Get Billing By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Billing> getBillingById(@PathVariable ("id") Long id){
        Billing billing = billingRepository.findAllById(id)
                .orElseThrow(()->new RuntimeException("Billing does not exist with Id:" + id));
        return ResponseEntity.ok(billing);
    }

    //GET - Get All Billing Lists REST API
    @GetMapping
    public  ResponseEntity<List<BillingDto>> getAllBillingLists(){
        List<BillingDto> billings = billingService.getAllBillingLists();
        return ResponseEntity.ok(billings);
    }

    //UPDATE - Update Billing REST API
    public ResponseEntity<Billing> updateBilling(long id, Billing billingDetails){
        Billing updateBilling = billingRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Billing does not exist with id: " + id));

        updateBilling.setTotalAmount(billingDetails.getTotalAmount());
        updateBilling.setPaymentStatus(billingDetails.getPaymentStatus());
        updateBilling.setPaymentMethod(billingDetails.getPaymentMethod());
        updateBilling.setBillingDate(billingDetails.getBillingDate());
        updateBilling.setPaymentDate(billingDetails.getPaymentDate());
        updateBilling.setRemarks(billingDetails.getRemarks());
        updateBilling.setPatient(billingDetails.getPatient());
        updateBilling.setTreatments(billingDetails.getTreatments());

        billingRepository.save(updateBilling);
        return ResponseEntity.ok(updateBilling);
    }

    //DELETE - Delete Billing REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBilling(@PathVariable ("id") Long billingId){
        billingService.deleteBilling(billingId);
        return ResponseEntity.ok("Billing Deleted Successfully");
    }
}

