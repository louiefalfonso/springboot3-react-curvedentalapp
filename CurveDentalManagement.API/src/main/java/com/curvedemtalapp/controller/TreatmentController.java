package com.curvedemtalapp.controller;

import com.curvedemtalapp.dto.TreatmentDto;
import com.curvedemtalapp.entity.Treatment;
import com.curvedemtalapp.repository.TreatmentRepository;
import com.curvedemtalapp.service.TreatmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    //GET - Get Treatment By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Treatment> getTreatmentById(@PathVariable ("id") Long id){
        Treatment treatment = treatmentRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Treatment does not exist with Id:" + id));
        return ResponseEntity.ok(treatment);
    }

    //GET - Get All Treatments REST API
    @GetMapping
    public  ResponseEntity<List<TreatmentDto>> getAllTreatments(){
        List<TreatmentDto> treatments = treatmentService.getAllTreatments();
        return ResponseEntity.ok(treatments);
    }

    //UPDATE - Update Treatment REST API
    @PutMapping("{id}")
    public ResponseEntity<Treatment> updateTreatment(@PathVariable  ("id") long id,
                                                     @RequestBody Treatment treatmentDetails){
        Treatment updateTreatment = treatmentRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Treatment does not exist with id: " + id));

        updateTreatment.setTreatmentName(treatmentDetails.getTreatmentName());
        updateTreatment.setTreatmentCode(treatmentDetails.getTreatmentCode());
        updateTreatment.setDescription(treatmentDetails.getDescription());
        updateTreatment.setDuration(treatmentDetails.getDuration());
        updateTreatment.setCost(treatmentDetails.getCost());
        updateTreatment.setInsuranceCoverage(treatmentDetails.getInsuranceCoverage());
        updateTreatment.setFollowUpCare(treatmentDetails.getFollowUpCare());
        updateTreatment.setRiskBenefits(treatmentDetails.getRiskBenefits());
        updateTreatment.setIndications(treatmentDetails.getIndications());

        treatmentRepository.save(updateTreatment);
        return ResponseEntity.ok(updateTreatment);
    }

    //DELETE - Delete Treatment REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTreatment(@PathVariable ("id") Long treatmentId){
        treatmentService.deleteTreatment(treatmentId);
        return ResponseEntity.ok("Treatment Deleted Successfully");
    }
}
