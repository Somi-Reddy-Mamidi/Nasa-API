package com.nasa.SpringNasaAPI.controller;

import com.nasa.SpringNasaAPI.Service.NasaApodService;
import com.nasa.SpringNasaAPI.model.NasaApodResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NasaApodController {
    @Autowired
    private  NasaApodService nasaApodService;

    @GetMapping("/apod")
    public
    List<NasaApodResponse> getAPOD ( @RequestParam(required = false) String date,
                                     @RequestParam(required = false) String startdate,
                                     @RequestParam(required = false) String enddate,
                                     @RequestParam(required = false) Integer count,
                                     @RequestParam(required = false) Boolean thumbs ) {
        return nasaApodService.getAPOD(date, startdate, enddate, count, thumbs);
    }

}
