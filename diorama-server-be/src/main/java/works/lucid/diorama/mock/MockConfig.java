package works.lucid.diorama.mock;

import java.util.List;

/**
 * Created by michaellif on 7/26/16.
 */
public class MockConfig {

	public String mockId;
	
	public String mockDir;

	public MockMode mode;

	public List<StubConfig> stubs;

	public MockContainer.Type mockType;

	public int portNumber;

	public String proxyUrlMatching;

	public String proxiedFrom;

	public MockConfig() {
	}

}
