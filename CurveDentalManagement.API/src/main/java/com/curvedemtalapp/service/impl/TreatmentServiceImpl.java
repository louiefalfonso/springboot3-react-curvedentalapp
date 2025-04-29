package com.curvedemtalapp.service.impl;

import com.curvedemtalapp.dto.TreatmentDto;
import com.curvedemtalapp.entity.Treatment;
import com.curvedemtalapp.repository.TreatmentRepository;
import com.curvedemtalapp.service.TreatmentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
}
