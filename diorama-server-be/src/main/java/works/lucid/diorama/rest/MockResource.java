package works.lucid.diorama.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import works.lucid.diorama.mock.MockConfig;
import works.lucid.diorama.mock.MockContainer;
import works.lucid.diorama.mock.MockContainerRegistry;
import works.lucid.diorama.mock.MockMode;

@Component
@Path("/mock")
public class MockResource {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<MockConfig> getAllMocks() {
		List<MockConfig> configs = new ArrayList<>();
		for (MockContainer mockContainer : MockContainerRegistry.getMockContainers()) {
			configs.add(mockContainer.getMockConfig());
		}
		return configs;
	}

	@GET
	@Path("/{mockId}")
	@Produces(MediaType.APPLICATION_JSON)
	public MockConfig getMock(@PathParam("mockId") String mockId) {
		return MockContainerRegistry.getMockContainer(mockId).getMockConfig();
	}

	@PUT
	@Path("/{mockId}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateMockConfig(@PathParam("mockId") String mockId, @QueryParam("mode") String mode) {
		MockContainerRegistry.getMockContainer(mockId).getMockApp().setMode(MockMode.valueOf(mode));
	}

	@PUT
	@Path("/{mockId}/stub/{stubId}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateStubConfig(@PathParam("mockId") String mockId, @PathParam("stubId") String stubId,
			@QueryParam("value") String value) {
		MockContainerRegistry.getMockContainer(mockId).getMockApp().setStubConfigValue(stubId, value);
	}

}
