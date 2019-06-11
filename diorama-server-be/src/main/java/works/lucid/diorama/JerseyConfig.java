package works.lucid.diorama;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

import works.lucid.diorama.rest.HealthResource;
import works.lucid.diorama.rest.HttpRequestResource;
import works.lucid.diorama.rest.MockResource;


@Configuration
@ApplicationPath("/webapi")
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {
        super();

        register(HealthResource.class);
        register(MockResource.class);
        register(HttpRequestResource.class);  

    }
}
/*
 * Copyright 2016 Capital One Financial Corporation All Rights Reserved.
 *
 * This software contains valuable trade secrets and proprietary information of
 * Capital One and is protected by law. It may not be copied or distributed in
 * any form or medium, disclosed to third parties, reverse engineered or used in
 * any manner without prior written authorization from Capital One.
 */