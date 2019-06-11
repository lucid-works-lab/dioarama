package works.lucid.diorama.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import works.lucid.diorama.mock.MockRequestItem;
import works.lucid.diorama.mock.MockRequestRecorder;

/**
 * Created by van481 on 7/26/16.
 */
@Path("/request/http")
public class HttpRequestResource {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<MockRequestItem> getMockRequestItemList(@QueryParam("index") long indexTo,
			@QueryParam("size") int size) {
		return MockRequestRecorder.getItems(indexTo, size);
	}

	@GET
	@Path("/{index}")
	@Produces(MediaType.APPLICATION_JSON)
	public MockRequestItem getMockRequestItem(@PathParam("index") long index) {
		return MockRequestRecorder.getItem(index);
	}

}
