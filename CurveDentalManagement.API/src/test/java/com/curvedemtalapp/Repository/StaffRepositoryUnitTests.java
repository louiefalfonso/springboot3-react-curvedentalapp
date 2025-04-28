package com.curvedemtalapp.Repository;

import com.curvedemtalapp.entity.Staff;
import com.curvedemtalapp.repository.StaffRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

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

    @Test
    @DisplayName("Test 3: Get All Staffs - Success")
    void getAllStaffs() {

        // Create and save multiple staff objects
        Staff staff1 = Staff.builder()
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

        Staff staff2 = Staff.builder()
                .firstName("John")
                .lastName("Doe")
                .staffRole("Dentist")
                .employeeNumber("CRV-3427687")
                .email("johndoe@curve-dental.co")
                .gender("Male")
                .phoneNumber("02-9876-54322")
                .age("35")
                .address("123 Elm Street, Hillington")
                .build();

        staffRepository.save(staff1);
        staffRepository.save(staff2);

        // Retrieve all staff
        List<Staff> staffs = staffRepository.findAll();

        // Verify that the list contains the saved staff objects
        Assertions.assertThat(staffs).isNotEmpty();
        Assertions.assertThat(staffs).hasSizeGreaterThanOrEqualTo(2);
        Assertions.assertThat(staffs).extracting(Staff::getFirstName).contains("Claire", "John");
        Assertions.assertThat(staffs).extracting(Staff::getLastName).contains("Jones", "Doe");
    }

    @Test
    @DisplayName("Test 4: Update Staff - Success")
    void updateStaff(){

        // create a new staff object
        Staff staff = Staff.builder()
                .firstName("Claire")
                .lastName("Jones")
                .staffRole("Dental Hygienist")
                .employeeNumber("CRV-3427686")
                .email("clairejones@curve-dental.co")
                .gender("Female")
                .phoneNumber("02-9876-54321")
                .age("28")
                .address("45 Maple Street, Hillington")
                .build();

        // save the staff
        Staff savedStaff = staffRepository.save(staff);

        // update the staff's details
        savedStaff.setFirstName("Claire Anne");
        savedStaff.setLastName("Smith");
        savedStaff.setStaffRole("Senior Dental Hygienist");
        savedStaff.setEmployeeNumber("CRV-3427681");
        savedStaff.setEmail("clairesmith@curve-dental.co");
        savedStaff.setGender("Female");
        savedStaff.setPhoneNumber("07-9876-54321");
        savedStaff.setAge("28");
        savedStaff.setAddress("45 Maple Street, Hillington DH6JF5");

        // Update the staff repository
        Staff updatedStaff = staffRepository.save(savedStaff);

        // Verify that the updated employee's details match the expected details
        Assertions.assertThat(updatedStaff.getFirstName()).isEqualTo("Claire Anne");
        Assertions.assertThat(updatedStaff.getLastName()).isEqualTo("Smith");
        Assertions.assertThat(updatedStaff.getStaffRole()).isEqualTo("Senior Dental Hygienist");
        Assertions.assertThat(updatedStaff.getEmployeeNumber()).isEqualTo("CRV-3427681");
        Assertions.assertThat(updatedStaff.getEmail()).isEqualTo("clairesmith@curve-dental.co");
        Assertions.assertThat(updatedStaff.getGender()).isEqualTo("Female");
        Assertions.assertThat(updatedStaff.getPhoneNumber()).isEqualTo("07-9876-54321");
        Assertions.assertThat(updatedStaff.getAge()).isEqualTo("28");
        Assertions.assertThat(updatedStaff.getAddress()).isEqualTo("45 Maple Street, Hillington DH6JF5");
    }

    @Test
    @DisplayName("Test 5: Delete Staff - Success")
    void deleteStaff(){
        // create a new staff object
        Staff staff = Staff.builder()
                .firstName("Claire")
                .lastName("Jones")
                .staffRole("Dental Hygienist")
                .employeeNumber("CRV-3427686")
                .email("clairejones@curve-dental.co")
                .gender("Female")
                .phoneNumber("02-9876-54321")
                .age("28")
                .address("45 Maple Street, Hillington")
                .build();

        // save the staff
        Staff savedStaff = staffRepository.save(staff);

        // verify that staff is saved
        Assertions.assertThat(savedStaff.getId()).isGreaterThan(0);

        // Delete the staff
        staffRepository.deleteById(savedStaff.getId());

        // Verify that the staff is deleted
        Staff deletedStaff = staffRepository.findById(savedStaff.getId()).orElse(null);
        Assertions.assertThat(deletedStaff).isNull();
    }
}




































