package works.lucid.diorama.mock;

import static com.google.common.base.Preconditions.checkState;

import com.github.tomakehurst.wiremock.common.FatalStartupException;
import com.github.tomakehurst.wiremock.http.HttpServer;
import com.github.tomakehurst.wiremock.http.HttpServerFactory;
import com.github.tomakehurst.wiremock.http.RequestListener;

/**
 * Created by van481 on 8/22/16.
 */
public class MockServer implements MockContainer {

	private HttpServer httpServer;

	private MockApp app;

	private MockConfig config;
	
	public MockServer(MockConfig config) {
		super();
		this.config = config;
		this.app = new MockApp(config.mockId, config.mockDir, config.proxyUrlMatching, config.stubs);
		HttpServerFactory httpServerFactory = app.getConfig().httpServerFactory();
		this.httpServer = httpServerFactory.buildHttpServer(app.getConfig(), app.getAdminRequestHandler(),
				app.getStubRequestHandler());
		addMockServiceRequestListener(new MockRequestRecorder(this));
	}

	@Override
	public int port() {
		checkState(isRunning(), "Not listening on HTTP port. The WireMock server is most likely stopped");
		return httpServer.port();
	}

	@Override
	public void shutdown() {
		Thread shutdownThread = new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					Thread.sleep(100L);
				} catch (InterruptedException var2) {
					throw new RuntimeException(var2);
				}

				stop();
			}
		});
		shutdownThread.start();
	}

	@Override
	public void stop() {
		this.httpServer.stop();
	}

	@Override
	public void start() {
		try {
			this.httpServer.start();
		} catch (Exception var2) {
			throw new FatalStartupException(var2);
		}
	}

	public boolean isRunning() {
		return this.httpServer.isRunning();
	}

	@Override
	public String getMockId() {
		return app.getMockId();
	}

	public void addMockServiceRequestListener(RequestListener listener) {
		app.getStubRequestHandler().addRequestListener(listener);
	}

	@Override
	public MockApp getMockApp() {
		return app;
	}

	@Override
	public MockConfig getMockConfig() {
		return config;
	}
}
