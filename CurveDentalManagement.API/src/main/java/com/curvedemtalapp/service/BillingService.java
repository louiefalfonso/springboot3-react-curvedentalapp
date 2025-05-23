package com.curvedemtalapp.service;

import com.curvedemtalapp.dto.BillingDto;

import java.util.List;

public interface BillingService {

    BillingDto createNewBilling(BillingDto billingDto);

    BillingDto getBillingById(long billingId);

    List<BillingDto> getAllBillingLists();

    BillingDto updateBilling(Long billingId, BillingDto updateBilling);

    void deleteBilling(Long billingId);
}
