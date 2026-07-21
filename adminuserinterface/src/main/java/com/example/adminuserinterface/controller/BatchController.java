package com.example.adminuserinterface.controller;

import com.example.adminuserinterface.entity.Batch;
import com.example.adminuserinterface.repository.BatchRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/batches")
@CrossOrigin(origins = "*")
public class BatchController {

    private final BatchRepository batchRepository;

    public BatchController(BatchRepository batchRepository) {
        this.batchRepository = batchRepository;
    }


    @GetMapping
    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }


    @PostMapping
    public Batch addBatch(@RequestBody Batch batch) {

        System.out.println("Batch Name: " + batch.getBatchName());
        System.out.println("Trainer Name: " + batch.getTrainerName());
        System.out.println("Course: " + batch.getCourse());

        return batchRepository.save(batch);
    }


    @PutMapping("/{id}")
    public Batch updateBatch(
            @PathVariable Long id,
            @RequestBody Batch batch) {

        Batch oldBatch = batchRepository.findById(id).orElse(null);

        if(oldBatch != null) {

            oldBatch.setBatchName(batch.getBatchName());
            oldBatch.setTrainerName(batch.getTrainerName());
            oldBatch.setCourse(batch.getCourse());

            return batchRepository.save(oldBatch);
        }

        return null;
    }


    @DeleteMapping("/{id}")
    public String deleteBatch(@PathVariable Long id) {

        batchRepository.deleteById(id);

        return "Batch Deleted Successfully";
    }
}