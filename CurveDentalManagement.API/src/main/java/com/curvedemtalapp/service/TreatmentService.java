package com.curvedemtalapp.service;

import com.curvedemtalapp.dto.TreatmentDto;

public interface TreatmentService {

    TreatmentDto createNewTreatment(TreatmentDto treatmentDto);

    TreatmentDto getTreatmentById(Long treatmentId);
}
