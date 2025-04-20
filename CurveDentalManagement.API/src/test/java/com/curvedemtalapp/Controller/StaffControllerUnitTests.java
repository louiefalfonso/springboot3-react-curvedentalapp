package com.curvedemtalapp.Controller;

import com.curvedemtalapp.controller.StaffController;
import com.curvedemtalapp.dto.StaffDto;
import com.curvedemtalapp.entity.Staff;
import com.curvedemtalapp.repository.StaffRepository;
import com.curvedemtalapp.service.StaffService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class StaffControllerUnitTests {

    @Mock
    private StaffService staffService;

    @Mock
    private StaffRepository staffRepository;

    @InjectMocks
    private StaffController staffController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @Order(1)
    @DisplayName("Test 1: Create New Staff - Success")
    void createNewStaff_Success(){
        // Arrange
        StaffDto inputStaffDto = new StaffDto();
        inputStaffDto.setFirstName("Claire");
        inputStaffDto.setLastName("Jones");
        inputStaffDto.setStaffRole("Receptionist");
        inputStaffDto.setEmail("clairejones@gmail.com");
        inputStaffDto.setPhoneNumber("07-3427-960453");
        inputStaffDto.setAge("26");
        inputStaffDto.setGender("Female");
        inputStaffDto.setAddress("221B Baker Street, London, NW1 6XE");

        StaffDto savedStaffDto = new StaffDto();
        savedStaffDto.setFirstName("Claire");
        savedStaffDto.setLastName("Jones");
        savedStaffDto.setStaffRole("Receptionist");
        savedStaffDto.setEmail("clairejones@gmail.com");
        savedStaffDto.setPhoneNumber("07-3427-960453");
        savedStaffDto.setAge("26");
        savedStaffDto.setGender("Female");
        savedStaffDto.setAddress("221B Baker Street, London, NW1 6XE");

        when(staffService.createNewStaff(inputStaffDto)).thenReturn(savedStaffDto);

        // Act
        ResponseEntity<StaffDto> response = staffController.createNewStaff(inputStaffDto);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedStaffDto, response.getBody());

        // Verify
        verify(staffService, times(1)).createNewStaff(inputStaffDto);
    }

    @Test
    @Order(2)
    @DisplayName("Test 2: Get Staff By Id - Success")
    void getStaffById_Success(){

        // Arrange
        Long staffId = 1L;
        Staff mockStaff = new Staff();
        mockStaff.setFirstName("Claire");
        mockStaff.setLastName("Jones");
        mockStaff.setStaffRole("Receptionist");
        mockStaff.setEmail("clairejones@gmail.com");
        mockStaff.setPhoneNumber("07-3427-960453");
        mockStaff.setAge("26");
        mockStaff.setGender("Female");
        mockStaff.setAddress("221B Baker Street, London, NW1 6XE");

        // Mock the behavior of staffRepository.findAllById()
        when(staffRepository.findAllById(staffId)).thenReturn(Optional.of(mockStaff));

        // Act
        ResponseEntity<Staff> response = staffController.getStaffById(staffId);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals(mockStaff, response.getBody());



    }

    @Test
    @Order(3)
    @DisplayName("Test 3: Get All Staffs - Success")
    void getAllListedStaffs_Success(){

        // Arrange
        StaffDto staffDto1 = new StaffDto();
        staffDto1.setFirstName("Claire");
        staffDto1.setLastName("Jones");
        staffDto1.setStaffRole("Receptionist");
        staffDto1.setEmail("clairejones@gmail.com");
        staffDto1.setPhoneNumber("07-3427-960453");
        staffDto1.setAge("26");
        staffDto1.setGender("Female");
        staffDto1.setAddress("221B Baker Street, London, NW1 6XE");

        StaffDto staffDto2 = new StaffDto();
        staffDto2.setFirstName("John");
        staffDto2.setLastName("Doe");
        staffDto2.setStaffRole("Manager");
        staffDto2.setEmail("johndoe@gmail.com");
        staffDto2.setPhoneNumber("07-1234-567890");
        staffDto2.setAge("30");
        staffDto2.setGender("Male");
        staffDto2.setAddress("10 Downing Street, London, SW1A 2AA");

        List<StaffDto> staffLists = Arrays.asList(staffDto1,staffDto2);
        when(staffService.getAllListedStaffs()).thenReturn(staffLists);

        ResponseEntity<List<StaffDto>> response = staffController.getAllListedStaffs();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        assertTrue(response.getBody().contains(staffDto1));
        assertTrue(response.getBody().contains(staffDto2));

        // Verify
        verify(staffService, times(1)).getAllListedStaffs();

    }

    @Test
    @Order(4)
    @DisplayName("Test 4: Update Staff - Success")
    void updateStaff_Success(){

        // Arrange
        long staffId = 1L;
        Staff existingStaff = new Staff();
        existingStaff.setId(staffId);
        existingStaff.setFirstName("Claire");
        existingStaff.setLastName("Jones");
        existingStaff.setStaffRole("Receptionist");
        existingStaff.setEmail("clairejones@gmail.com");
        existingStaff.setPhoneNumber("07-3427-960453");
        existingStaff.setAge("26");
        existingStaff.setGender("Female");
        existingStaff.setAddress("221B Baker Street, London, NW1 6XE");

        Staff updatedStaffDetails = new Staff();
        updatedStaffDetails.setFirstName("John");
        updatedStaffDetails.setLastName("Doe");
        updatedStaffDetails.setStaffRole("Manager");
        updatedStaffDetails.setEmail("johndoe@gmail.com");
        updatedStaffDetails.setPhoneNumber("07-1234-567890");
        updatedStaffDetails.setAge("30");
        updatedStaffDetails.setGender("Male");
        updatedStaffDetails.setAddress("10 Downing Street, London, SW1A 2AA");

        when(staffRepository.findById(staffId)).thenReturn(Optional.of(existingStaff));
        when(staffRepository.save(existingStaff)).thenReturn(existingStaff);

        // Act
        ResponseEntity<Staff> response = staffController.updateStaff(staffId, updatedStaffDetails);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        assertEquals("John", response.getBody().getFirstName());
        assertEquals("Doe", response.getBody().getLastName());
        assertEquals("Manager", response.getBody().getStaffRole());
        assertEquals("johndoe@gmail.com", response.getBody().getEmail());
        assertEquals("07-1234-567890", response.getBody().getPhoneNumber());
        assertEquals("30", response.getBody().getAge());
        assertEquals("Male", response.getBody().getGender());
        assertEquals("10 Downing Street, London, SW1A 2AA", response.getBody().getAddress());

        // Verify
        verify(staffRepository, times(1)).findById(staffId);
        verify(staffRepository, times(1)).save(existingStaff);
    }

    @Test
    @Order(5)
    @DisplayName("Test 5: Delete Staff - Success")
    void deleteStaff_Success(){

        // Arrange
        Long staffId = 1L;

        // Mock the service method to do nothing (since it's a void method)
        doNothing().when(staffService).deleteStaff(staffId);

        // Act
        ResponseEntity<String> response = staffController.deleteStaff(staffId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Staff Deleted Successfully", response.getBody());

        // Verify that the service method was called once
        verify(staffService, times(1)).deleteStaff(staffId);

    }

    @Test
    @Order(6)
    @DisplayName("Test 6: Get Staff By Id - When Staff Does Not Exist")
    void getStaffById_WhenStaffDoesNotExist(){

        // Arrange
        Long staffId = 999L;

        // Mock the behavior of staffRepository.findAllById() to return an empty Optional
        when(staffRepository.findAllById(staffId)).thenReturn(Optional.empty());

        // Act and Assert
        RuntimeException exception = assertThrows(RuntimeException.class, ()-> staffController.getStaffById(staffId));

        // Verify the exception message
        assertEquals("Staff does not exist with Id:999", exception.getMessage());
    }

    @Test
    @Order(7)
    @DisplayName("Test 7: Create New Staff - Null Input")
    void createNewStaff_NullInput() {
        // Arrange
        when(staffService.createNewStaff(null)).thenReturn(null);

        // Act
        ResponseEntity<StaffDto> response = staffController.createNewStaff(null);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNull(response.getBody());

        // Verify
        verify(staffService, times(1)).createNewStaff(null);
    }

    @Test
    @Order(8)
    @DisplayName("Test 8: Create New Staff - Service Throws Exception")
    void createNewStaff_ServiceThrowsException() {
        // Arrange
        StaffDto inputStaffDto = new StaffDto();
        inputStaffDto.setFirstName("Claire");
        inputStaffDto.setLastName("Jones");
        inputStaffDto.setStaffRole("Receptionist");
        inputStaffDto.setEmail("clairejones@gmail.com");
        inputStaffDto.setPhoneNumber("07-3427-960453");
        inputStaffDto.setAge("26");
        inputStaffDto.setGender("Female");
        inputStaffDto.setAddress("221B Baker Street, London, NW1 6XE");

        when(staffService.createNewStaff(inputStaffDto)).thenThrow(new RuntimeException("Service Error"));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> staffController.createNewStaff(inputStaffDto));

        assertEquals("Service Error", exception.getMessage());

        // Verify
        verify(staffService, times(1)).createNewStaff(inputStaffDto);
    }

    @Test
    @Order(9)
    @DisplayName("Test 9: Update Staff - Not Found")
    void updateStaff_NotFound(){
        // Arrange
        long staffId = 1L;
        Staff updateStaff = new Staff();
        when(staffRepository.findById(staffId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, ()-> staffController.updateStaff(staffId, updateStaff));

        // Assert
        assertEquals("Staff does not exist with id: " + staffId, exception.getMessage());

        // Verify
        verify(staffRepository, times(1)).findById(staffId);
        verify(staffRepository, never()).save(any());

    }

    @Test
    @Order(10)
    @DisplayName("Test 10: Delete Staff - Exception Thrown")
    void deleteStaff_ExceptionThrown() {
        // Arrange
        Long staffId = 1L;

        // Mock the service method to throw an exception
        doThrow(new RuntimeException("Staff not found")).when(staffService).deleteStaff(staffId);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> staffController.deleteStaff(staffId));

        assertEquals("Staff not found", exception.getMessage());

        // Verify that the service method was called once
        verify(staffService, times(1)).deleteStaff(staffId);
    }

}
