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
