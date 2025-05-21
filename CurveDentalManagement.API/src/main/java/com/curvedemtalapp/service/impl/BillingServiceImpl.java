package com.curvedemtalapp.service.impl;

import com.curvedemtalapp.dto.BillingDto;
import com.curvedemtalapp.entity.Billing;
import com.curvedemtalapp.repository.BillingRepository;
import com.curvedemtalapp.service.BillingService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
}
