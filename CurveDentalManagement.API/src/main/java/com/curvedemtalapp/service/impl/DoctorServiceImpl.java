package com.curvedemtalapp.service.impl;

import com.curvedemtalapp.dto.DoctorDto;
import com.curvedemtalapp.entity.Doctor;
import com.curvedemtalapp.repository.DoctorRepository;
import com.curvedemtalapp.repository.TreatmentRepository;
import com.curvedemtalapp.service.DoctorService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private DoctorRepository doctorRepository;
    private TreatmentRepository treatmentRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Patient
    @Override
    public DoctorDto createNewDoctor(DoctorDto doctorDto) {
        Doctor doctor = modelMapper.map(doctorDto, Doctor.class);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return modelMapper.map(savedDoctor, DoctorDto.class);
    }

    // REST API - Get Doctor By ID
    @Override
    public DoctorDto getDoctorById(Long doctorId) {
        Doctor doctor = doctorRepository.findAllById(doctorId).
                orElseThrow(()-> new RuntimeException("Doctor doesn't exist with a given Id:" + doctorId));
        return modelMapper.map(doctor, DoctorDto.class);
    }

    // REST API - Get All Doctors
    @Override
    public List<DoctorDto> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        return doctors.stream().map((doctor -> modelMapper.map(doctor, DoctorDto.class)))
                .collect(Collectors.toList());
    }

    // REST API - Update Doctor
    @Override
    public DoctorDto updateDoctor(Long doctorId, DoctorDto updateDoctor) {
        Doctor doctor = doctorRepository.findAllById(doctorId)
                .orElseThrow(()-> new RuntimeException("Doctor doesn't exist with a given Id:" + doctorId));

        doctor.setFirstName(updateDoctor.getFirstName());
        doctor.setLastName(updateDoctor.getLastName());
        doctor.setEmail(updateDoctor.getEmail());
        doctor.setContactNumber(updateDoctor.getContactNumber());
        doctor.setSpecialization(updateDoctor.getSpecialization());
        doctor.setDepartment(updateDoctor.getDepartment());
        doctor.setSchedule(updateDoctor.getSchedule());
        doctor.setLicenseNumber(updateDoctor.getLicenseNumber());
        doctor.setYearsOfExperience(updateDoctor.getYearsOfExperience());
        doctor.setDentalSchool(updateDoctor.getDentalSchool());
        doctor.setOfficeAddress(updateDoctor.getOfficeAddress());
        doctor.setEmergencyContact(updateDoctor.getEmergencyContact());
        doctor.setTreatments(updateDoctor.getTreatments());

        Doctor updateDoctorObj = doctorRepository.save(doctor);
        return modelMapper.map(updateDoctorObj, DoctorDto.class);
    }

    // REST API - Delete Doctor
    @Override
    public void deleteDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findAllById(doctorId)
                .orElseThrow(()-> new RuntimeException("Doctor doesn't exist with given id:" + doctorId));
        doctorRepository.deleteById(doctorId);
    }
}
