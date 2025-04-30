package com.curvedemtalapp.service.impl;

import com.curvedemtalapp.dto.TreatmentDto;
import com.curvedemtalapp.entity.Treatment;
import com.curvedemtalapp.repository.TreatmentRepository;
import com.curvedemtalapp.service.TreatmentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TreatmentServiceImpl implements TreatmentService {

    private TreatmentRepository treatmentRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Treatment
    @Override
    public TreatmentDto createNewTreatment(TreatmentDto treatmentDto) {
        Treatment treatment = modelMapper.map(treatmentDto, Treatment.class);
        Treatment savedTreatment = treatmentRepository.save(treatment);
        return modelMapper.map(savedTreatment, TreatmentDto.class);
    }

    // REST API - Get Treatment By ID
    @Override
    public TreatmentDto getTreatmentById(Long treatmentId) {
        Treatment treatment = treatmentRepository.findAllById(treatmentId)
                .orElseThrow(()-> new RuntimeException("Treatment doesn't exist with a given Id:" + treatmentId));
        return modelMapper.map(treatment, TreatmentDto.class);
    }

    // REST API - Get All Treatments
    @Override
    public List<TreatmentDto> getAllTreatments() {
        List<Treatment> treatments = treatmentRepository.findAll();
        return treatments.stream().map((treatment-> modelMapper.map(treatment, TreatmentDto.class)))
                .collect(Collectors.toList());
    }

    // REST API - Update Treatment
    @Override
    public TreatmentDto updateTreatment(Long treatmentId, TreatmentDto updateTreatment) {
        Treatment treatment = treatmentRepository.findAllById(treatmentId)
                .orElseThrow(()-> new RuntimeException("Treatment doesn't exist with a given Id:" + treatmentId));

        treatment.setTreatmentName(updateTreatment.getTreatmentName());
        treatment.setTreatmentCode(updateTreatment.getTreatmentCode());
        treatment.setDescription(updateTreatment.getDescription());
        treatment.setDuration(updateTreatment.getDuration());
        treatment.setCost(updateTreatment.getCost());
        treatment.setInsuranceCoverage(updateTreatment.getInsuranceCoverage());
        treatment.setFollowUpCare(updateTreatment.getFollowUpCare());
        treatment.setRiskBenefits(updateTreatment.getRiskBenefits());
        treatment.setIndications(updateTreatment.getIndications());


        Treatment updateTreatmentObj = treatmentRepository.save(treatment);
        return modelMapper.map(updateTreatmentObj, TreatmentDto.class);
    }

    // REST API - Delete Treatment
    @Override
    public void deleteTreatment(Long treatmentId) {
        Treatment treatment = treatmentRepository.findAllById(treatmentId)
                .orElseThrow(()->new RuntimeException("Treatment doesn't exist with given id:" + treatmentId));
        treatmentRepository.deleteById(treatmentId);
    }
}

