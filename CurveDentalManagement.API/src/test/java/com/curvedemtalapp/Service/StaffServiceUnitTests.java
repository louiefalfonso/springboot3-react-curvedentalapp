package com.curvedemtalapp.Service;

import com.curvedemtalapp.dto.StaffDto;
import com.curvedemtalapp.entity.Staff;
import com.curvedemtalapp.repository.StaffRepository;
import com.curvedemtalapp.service.impl.StaffServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class StaffServiceUnitTests {

    @Mock
    private StaffRepository staffRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private StaffServiceImpl staffService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Test 1: Create New Staff - Success")
    void createNewStaff_Success(){

        // Arrange
        StaffDto staffDto = new StaffDto();
        staffDto.setFirstName("Claire");
        staffDto.setLastName("Jones");

        Staff staff = new Staff();
        staff.setFirstName("Claire");
        staff.setLastName("Jones");

        when(modelMapper.map(staffDto, Staff.class)).thenReturn(staff);
        when(staffRepository.save(staff)).thenReturn(staff);
        when(modelMapper.map(staff, StaffDto.class)).thenReturn(staffDto);

        // Act
        StaffDto result = staffService.createNewStaff(staffDto);

        // Assert
        assertNotNull(result);
        assertEquals("Claire", result.getFirstName());
        assertEquals("Jones", result.getLastName());

        // Verify
        verify(staffRepository, times(1)).save(staff);
    }

    @Test
    @DisplayName("Test 2: Get Staff By Id - Success")
    void getStaffById_Success(){

        // Arrange
        Long staffId = 1L;
        Staff staff = new Staff();
        staff.setId(staffId);
        when(staffRepository.findAllById(staffId)).thenReturn(Optional.of(staff));

        StaffDto expectedStaffDto = new StaffDto();
        expectedStaffDto.setId(staffId);
        when(modelMapper.map(staff, StaffDto.class)).thenReturn(expectedStaffDto);

        // Act
        StaffDto actualStaffDto = staffService.geStaffById(staffId);

        // Assert
        assertEquals(expectedStaffDto, actualStaffDto);
    }

    @Test
    @DisplayName("Test 3: Get All Staffs - Success")
    void getAllStaff_Success(){

        // Arrange
        Staff staff1 = new Staff();
        staff1.setId(1L);

        Staff staff2 = new Staff();
        staff2.setId(2L);

        List<Staff> staffs = Arrays.asList(staff1, staff2);

        StaffDto staffDto1 = new StaffDto();
        staffDto1.setId(1L);

        StaffDto staffDto2 = new StaffDto();
        staffDto2.setId(2L);

        when(staffRepository.findAll()).thenReturn(staffs);
        when(modelMapper.map(staff1, StaffDto.class)).thenReturn(staffDto1);
        when(modelMapper.map(staff2, StaffDto.class)).thenReturn(staffDto2);

        // Act
        List<StaffDto> result = staffService.getAllListedStaffs();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).getId());
        assertEquals(2L, result.get(1).getId());
        verify(staffRepository, times(1)).findAll();
        verify(modelMapper, times(1)).map(staff1, StaffDto.class);
        verify(modelMapper, times(1)).map(staff2, StaffDto.class);
    }

    @Test
    @DisplayName("Test 4: Update Staff - Success")
    void updateStaff_Success(){

        // Arrange
        Long staffId = 1L;
        StaffDto updateStaffDto = new StaffDto();
        updateStaffDto.setId(staffId);
        updateStaffDto.setFirstName("John");
        updateStaffDto.setLastName("Doe");
        updateStaffDto.setStaffRole("Manager");
        updateStaffDto.setEmail("johndoe@gmail.com");
        updateStaffDto.setPhoneNumber("07-1234-567890");
        updateStaffDto.setAge("30");
        updateStaffDto.setGender("Male");
        updateStaffDto.setAddress("10 Downing Street, London, SW1A 2AA");

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

        Staff updatedStaff = new Staff();
        updatedStaff.setId(staffId);
        updatedStaff.setFirstName("John");
        updatedStaff.setLastName("Doe");
        updatedStaff.setStaffRole("Manager");
        updatedStaff.setEmail("johndoe@gmail.com");
        updatedStaff.setPhoneNumber("07-1234-567890");
        updatedStaff.setAge("30");
        updatedStaff.setGender("Male");
        updatedStaff.setAddress("10 Downing Street, London, SW1A 2AA");

        StaffDto expectedStaffDto = new StaffDto();
        expectedStaffDto.setId(staffId);
        expectedStaffDto.setFirstName("John");
        expectedStaffDto.setLastName("Doe");
        expectedStaffDto.setStaffRole("Manager");
        expectedStaffDto.setEmail("johndoe@gmail.com");
        expectedStaffDto.setPhoneNumber("07-1234-567890");
        expectedStaffDto.setAge("30");
        expectedStaffDto.setGender("Male");
        expectedStaffDto.setAddress("10 Downing Street, London, SW1A 2AA");

        when(staffRepository.findAllById(staffId)).thenReturn(Optional.of(existingStaff));
        when(staffRepository.save(existingStaff)).thenReturn(updatedStaff);
        when(modelMapper.map(updatedStaff, StaffDto.class)).thenReturn(expectedStaffDto);

        // Act
        StaffDto result = staffService.updateStaff(staffId, updateStaffDto);

        // Assert
        assertNotNull(result);
        assertEquals(staffId, result.getId());
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());
        assertEquals("Manager", result.getStaffRole());
        assertEquals("johndoe@gmail.com", result.getEmail());
        assertEquals("07-1234-567890", result.getPhoneNumber());
        assertEquals("30", result.getAge());
        assertEquals("Male", result.getGender());
        assertEquals("10 Downing Street, London, SW1A 2AA", result.getAddress());

        // Verify
        verify(staffRepository, times(1)).findAllById(staffId);
        verify(staffRepository, times(1)).save(existingStaff);
        verify(modelMapper, times(1)).map(updatedStaff, StaffDto.class);

    }

    @Test
    @DisplayName("Test 5: Delete Staff - Success")
    void deleteStaff_Success() {
        // Arrange
        Long staffId = 1L;
        Staff staff = new Staff();
        when(staffRepository.findAllById(staffId)).thenReturn(Optional.of(staff));

        // Act
        staffService.deleteStaff(staffId);

        // Assert
        verify(staffRepository, times(1)).deleteById(staffId);
    }
}

