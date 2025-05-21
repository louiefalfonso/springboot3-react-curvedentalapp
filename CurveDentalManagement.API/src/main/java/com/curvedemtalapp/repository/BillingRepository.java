package com.curvedemtalapp.repository;

import com.curvedemtalapp.entity.Billing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BillingRepository extends JpaRepository<Billing, Long> {

    Optional<Billing> findAllById(Long billingId);
}
