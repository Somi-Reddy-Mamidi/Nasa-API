package com.nasa.SpringNasaAPI.model;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public
class NasaApodResponse {
    private String copyright;
    private String date ;
    private  String explanation ;
    private String hdurl;
    private String media_type;
    private String service_version;
    private String title;
    private String url;

}
