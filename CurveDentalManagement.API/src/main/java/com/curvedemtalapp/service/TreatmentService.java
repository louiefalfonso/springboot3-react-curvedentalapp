package com.curvedemtalapp.service;

import com.curvedemtalapp.dto.TreatmentDto;

import java.util.List;

public interface TreatmentService {

    TreatmentDto createNewTreatment(TreatmentDto treatmentDto);

    TreatmentDto getTreatmentById(Long treatmentId);

    List<TreatmentDto> getAllTreatments();

    TreatmentDto updateTreatment(Long treatmentId, TreatmentDto updateTreatment);

    void deleteTreatment(Long treatmentId);
}
