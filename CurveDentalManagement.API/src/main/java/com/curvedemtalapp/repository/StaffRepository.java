package com.curvedemtalapp.repository;

import com.curvedemtalapp.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    Optional<Staff> findAllById(Long staffId);
}
