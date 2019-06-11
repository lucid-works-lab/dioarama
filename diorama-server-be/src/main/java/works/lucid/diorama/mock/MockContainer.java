package works.lucid.diorama.mock;

import com.github.tomakehurst.wiremock.core.Container;

/**
 * Created by van481 on 8/22/16.
 */
public interface MockContainer extends Container {

	public static enum Type {
		Server, Servlet
	}
	
	MockApp getMockApp();

	MockConfig getMockConfig();

	String getMockId();

	void start();

	void stop();
}
