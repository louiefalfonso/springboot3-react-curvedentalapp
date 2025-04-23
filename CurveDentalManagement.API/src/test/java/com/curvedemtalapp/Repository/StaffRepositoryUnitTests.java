package com.curvedemtalapp.Repository;

import com.curvedemtalapp.entity.Staff;
import com.curvedemtalapp.repository.StaffRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class StaffRepositoryUnitTests {

    @Autowired
    private StaffRepository staffRepository;

    @Test
    @DisplayName("Test 1: Create New Staff - Success")
    void createNewStaff() {

        // Create a new staff object
        Staff staff = Staff.builder()
                .firstName("Claire")
                .lastName("Jones")
                .staffRole("Dental Hygienist")
                .employeeNumber("CRV-3427686")
                .email("emilyjohnson@curve-dental.co")
                .gender("Female")
                .phoneNumber("02-9876-54321")
                .age("28")
                .address("45 Maple Street, Hillington")
                .build();

        // Save the staff
        Staff savedStaff = staffRepository.save(staff);

        // Verify that the patient is saved
        Assertions.assertThat(savedStaff.getId()).isGreaterThan(0);
        Assertions.assertThat(savedStaff.getFirstName()).isEqualTo("Claire");
        Assertions.assertThat(savedStaff.getLastName()).isEqualTo("Jones");
        Assertions.assertThat(savedStaff.getEmployeeNumber()).isEqualTo("CRV-3427686");
        Assertions.assertThat(savedStaff.getStaffRole()).isEqualTo("Dental Hygienist");
        Assertions.assertThat(savedStaff.getEmail()).isEqualTo("emilyjohnson@curve-dental.co");
        Assertions.assertThat(savedStaff.getGender()).isEqualTo("Female");
        Assertions.assertThat(savedStaff.getPhoneNumber()).isEqualTo("02-9876-54321");
        Assertions.assertThat(savedStaff.getAge()).isEqualTo("28");
        Assertions.assertThat(savedStaff.getAddress()).isEqualTo("45 Maple Street, Hillington");
    }

    @Test
    @DisplayName("Test 2: Get Staff By Id - Success")
    void getStaffById() {

        // Create a new staff object
        Staff staff = Staff.builder()
                .firstName("Claire")
                .lastName("Jones")
                .staffRole("Dental Hygienist")
                .employeeNumber("CRV-3427686")
                .email("emilyjohnson@curve-dental.co")
                .gender("Female")
                .phoneNumber("02-9876-54321")
                .age("28")
                .address("45 Maple Street, Hillington")
                .build();

        // Save the staff
        Staff savedStaff = staffRepository.save(staff);

        // Retrieve the staff by ID
        Staff retrievedStaff = staffRepository.findById(savedStaff.getId()).orElse(null);

        // Verify that the retrieved employee is not null
        Assertions.assertThat(retrievedStaff).isNotNull();

        // Verify that the retrieved staff's details match the saved employee's details
        Assertions.assertThat(retrievedStaff.getFirstName()).isEqualTo("Claire");
        Assertions.assertThat(retrievedStaff.getLastName()).isEqualTo("Jones");
        Assertions.assertThat(retrievedStaff.getEmployeeNumber()).isEqualTo("CRV-3427686");
        Assertions.assertThat(retrievedStaff.getStaffRole()).isEqualTo("Dental Hygienist");
        Assertions.assertThat(retrievedStaff.getEmail()).isEqualTo("emilyjohnson@curve-dental.co");
        Assertions.assertThat(retrievedStaff.getGender()).isEqualTo("Female");
        Assertions.assertThat(retrievedStaff.getPhoneNumber()).isEqualTo("02-9876-54321");
        Assertions.assertThat(retrievedStaff.getAge()).isEqualTo("28");
        Assertions.assertThat(retrievedStaff.getAddress()).isEqualTo("45 Maple Street, Hillington");
    }
}
