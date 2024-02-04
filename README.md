#                                     NASA APOD Spring API
This Spring Boot application provides an API endpoint to retrieve NASA's Astronomy Picture of the Day (APOD) using the NASA API. It allows users to fetch APOD data based on parameters such as date, start date, end date, count, and whether to include thumbnails.

### Table of Contents
* Controllers
* Models
* Services
* Main Application
* Configuration
## Controllers
### NasaApodController
The NasaApodController class is a Spring RestController responsible for handling incoming HTTP requests related to APOD data. It utilizes the NasaApodService to fetch the data and returns a list of NasaApodResponse objects.

``` java
@RestController
public class NasaApodController {

    @Autowired
    private NasaApodService nasaApodService;

    @GetMapping("/apod")
    public List<NasaApodResponse> getAPOD(
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String start_date,
            @RequestParam(required = false) String end_date,
            @RequestParam(required = false) Integer count,
            @RequestParam(required = false) Boolean thumbs
    ) {
        return nasaApodService.getAPOD(date, start_date, end_date, count, thumbs);
    }
}
```
## Model Classes 
### NasaApodResponse
The NasaApodResponse class represents the structure of the response received from the NASA APOD API. It includes fields such as copyright, date, explanation, hdurl, media_type, service_version, title, and url.

``` java

@Getter
@Setter
@ToString
public class NasaApodResponse {

    private String copyright;
    private String date;
    private String explanation;
    private String hdurl;
    private String media_type;
    private String service_version;
    private String title;
    private String url;
}
```

## Services
### NasaApodService
The NasaApodService class is responsible for communicating with the NASA APOD API. It uses RestTemplate to make HTTP requests and fetch APOD data based on the provided parameters.

``` java

@Service
public class NasaApodService {

    private RestTemplate restTemplate = new RestTemplate();

    @Value("${nasa.api.key}")
    private String apiKey;

    @Value("${nasa.api.url}")
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

```
## Main Application
### SpringNasaApiApplication
The SpringNasaApiApplication class serves as the entry point for the Spring Boot application. It contains the main method to start the application.

``` java
@SpringBootApplication
public class SpringNasaApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringNasaApiApplication.class, args);
    }
}
```
## Configuration
### application.properties
The application.properties file contains configuration properties for the application, such as the server port, NASA API URL, and API key.

``` java
server.port=9090
nasa.api.url=https://api.nasa.gov/planetary/apod
nasa.api.key=sIIvSFCJdbdFzoHnjlDB1kZ3BdkhmeVac4rnEmwF
```

## Endpoint Usage
To interact with the NASA APOD API, you can use tools like Postman. Here's an example of how to use the /apod endpoint:

1. **Method:** GET
2. **URL:**  http://localhost:9090/apod
3. **Parameters:** (Add parameters as needed)
    * **date** : A specific date for APOD
    * **start_date** : Start date for a range of APOD entries
    * **end_date** : End date for a range of APOD entries
    * **count** : Number of entries to fetch
    * **thumbs** : Include thumbnails (true/false)
 4. **Example URL** : http://localhost:9090/apod?date=2024-01-01
    ![image](https://github.com/Somi-Reddy-Mamidi/Nasa-API/assets/158804084/931277de-8617-48b6-9fab-2bf2b6ca4862)
* http://localhost:9090/apod?count=10
  
![image](https://github.com/Somi-Reddy-Mamidi/Nasa-API/assets/158804084/e036e018-a3ab-4a39-aae9-e653dcabbd23)
* http://localhost:9090/apod?start_date=2024-01-01&end_date=2024-02-01
  
![image](https://github.com/Somi-Reddy-Mamidi/Nasa-API/assets/158804084/aac17384-2552-4693-9668-842683217e9d)


