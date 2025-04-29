package com.curvedemtalapp.controller;

import com.curvedemtalapp.dto.TreatmentDto;
import com.curvedemtalapp.repository.TreatmentRepository;
import com.curvedemtalapp.service.TreatmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/treatments")
public class TreatmentController {

    private TreatmentRepository treatmentRepository;
    private TreatmentService treatmentService;

    //POST - Create New Treatment REST API
    @PostMapping
    public ResponseEntity<TreatmentDto> createNewTreatment(@RequestBody TreatmentDto treatmentDto){
        TreatmentDto savedTreatment = treatmentService.createNewTreatment(treatmentDto);
        return new ResponseEntity<>(savedTreatment, HttpStatus.CREATED);
    }
}
