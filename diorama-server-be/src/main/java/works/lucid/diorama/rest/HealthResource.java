package works.lucid.diorama.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.stereotype.Component;

@Component
@Path("/health")
public class HealthResource {

	@GET
	public String health() {
		return "Health is OK.";
	}

}