package com.nasa.SpringNasaAPI.Service;

import com.nasa.SpringNasaAPI.model.NasaApodResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class NasaApodService {


    private  RestTemplate restTemplate = new RestTemplate (  );

    @Value("${nasa.api.key}")
    private  String apiKey;

    @Value ( "${nasa.api.url}" )
    private String apiUrl;

    public
    List<NasaApodResponse> getAPOD ( String date, String start_date, String end_date, Integer count, Boolean thumbs ) {
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("api_key", apiKey)
                .queryParam("date", date)
                .queryParam("start_date", start_date)
                .queryParam("end_date", end_date)
                .queryParam("count", count)
                .queryParam("thumbs", thumbs);
        

        // Attempt to fetch as a list first
        try {
            ResponseEntity<NasaApodResponse[]> responseEntity = restTemplate.getForEntity(uriBuilder.toUriString ( ), NasaApodResponse[].class);
            return Arrays.stream( responseEntity.getBody () ).toList ();
        } catch (Exception e) {
            try {
                NasaApodResponse singleResponse = restTemplate.getForObject(apiUrl, NasaApodResponse.class);
                return Collections.singletonList (singleResponse );
            } catch (Exception ex) {
                throw new RuntimeException("Error fetching APOD data: " + ex.getMessage(), ex);
            }
        }
    }


}
