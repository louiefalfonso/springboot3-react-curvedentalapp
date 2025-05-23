package com.curvedemtalapp.service.impl;

import com.curvedemtalapp.dto.BillingDto;
import com.curvedemtalapp.entity.Billing;
import com.curvedemtalapp.repository.BillingRepository;
import com.curvedemtalapp.service.BillingService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BillingServiceImpl implements BillingService {

    private BillingRepository billingRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Billing
    @Override
    public BillingDto createNewBilling(BillingDto billingDto) {
        Billing billing = modelMapper.map(billingDto, Billing.class);
        Billing savedBilling = billingRepository.save(billing);
        return modelMapper.map(savedBilling, BillingDto.class);
    }

    // REST API - Get Billing By ID
    @Override
    public BillingDto getBillingById(long billingId) {
        Billing billing = billingRepository.findAllById(billingId)
                .orElseThrow(()->new RuntimeException("Billing doesn't exist with a given Id:" + billingId));
        return  modelMapper.map(billing, BillingDto.class);
    }

    // REST API - Get All Billing Lists
    @Override
    public List<BillingDto> getAllBillingLists() {
       List<Billing> billings = billingRepository.findAll();
       return billings.stream().map((billing -> modelMapper.map(billing, BillingDto.class)))
               .collect(Collectors.toList());
    }

    // REST API - Update Billing
    @Override
    public BillingDto updateBilling(Long billingId, BillingDto updateBilling) {
        Billing billing = billingRepository.findAllById(billingId)
                .orElseThrow(()-> new RuntimeException("Billing doesn't exist with a given Id:" + billingId));

        billing.setTotalAmount(updateBilling.getTotalAmount());
        billing.setPaymentStatus(updateBilling.getPaymentStatus());
        billing.setPaymentMethod(updateBilling.getPaymentMethod());
        billing.setBillingDate(updateBilling.getBillingDate());
        billing.setPaymentDate(updateBilling.getPaymentDate());
        billing.setRemarks(updateBilling.getRemarks());
        billing.setTreatments(updateBilling.getTreatments());

        Billing updateBillingObj = billingRepository.save(billing);
        return  modelMapper.map(updateBillingObj, BillingDto.class);
    }

    // REST API - Delete Billing
    @Override
    public void deleteBilling(Long billingId) {
        Billing billing = billingRepository.findAllById(billingId)
                .orElseThrow(()->new RuntimeException("Billing doesn't exist with given id:" + billingId));
        billingRepository.deleteById(billingId);
    }
}


