package com.nasa.SpringNasaAPI.model;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public
class NasaApodResponse {
    private String hdurl;


    private String media_type;
    private String service_version;
    private String title;
    private String url;
    private String copyright;
    private String date ;
    private  String explanation ;

    public
    void setCopyright ( String copyright ) {
        this.copyright = copyright;
    }

    public
    void setDate ( String date ) {
        this.date = date;
    }

    public
    void setExplanation ( String explanation ) {
        this.explanation = explanation;
    }

    public
    void setHdurl ( String hdurl ) {
        this.hdurl = hdurl;
    }

    public
    void setMedia_type ( String media_type ) {
        this.media_type = media_type;
    }

    public
    void setService_version ( String service_version ) {
        this.service_version = service_version;
    }

    public
    void setTitle ( String title ) {
        this.title = title;
    }

    public
    void setUrl ( String url ) {
        this.url = url;
    }





}
