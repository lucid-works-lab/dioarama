package works.lucid.diorama.mock;

import java.io.IOException;
import java.util.Iterator;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRegistration;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.github.tomakehurst.wiremock.common.Exceptions;
import com.github.tomakehurst.wiremock.common.LocalNotifier;
import com.github.tomakehurst.wiremock.common.Slf4jNotifier;
import com.github.tomakehurst.wiremock.http.HttpHeader;
import com.github.tomakehurst.wiremock.http.RequestListener;
import com.github.tomakehurst.wiremock.http.Response;
import com.github.tomakehurst.wiremock.servlet.WireMockHttpServletRequestAdapter;

/**
 * Created by van481 on 8/22/16.
 */
public class MockServlet extends HttpServlet implements MockContainer {

	private static final long serialVersionUID = 0;

	private MockApp app;

	private ServletContext context;
	
	private MockConfig config;

	public MockServlet(MockConfig config, ServletContext context) {
		super();
		this.config = config;
		this.app = new MockApp(config.mockId, config.mockDir, config.proxyUrlMatching, config.stubs);
		this.context = context;
		addMockServiceRequestListener(new MockRequestRecorder(this));
	}

	@Override
	protected void service(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
			throws ServletException, IOException {
		LocalNotifier.set(new Slf4jNotifier(true));
		WireMockHttpServletRequestAdapter request = new WireMockHttpServletRequestAdapter(httpServletRequest,
				"/" + app.getMockId());
		Response response = this.app.getStubRequestHandler().handle(request);
		if (!Thread.currentThread().isInterrupted()) {
			if (response.wasConfigured()) {
				if (response.getStatusMessage() == null) {
					httpServletResponse.setStatus(response.getStatus());
				} else {
					httpServletResponse.setStatus(response.getStatus(), response.getStatusMessage());
				}

				Iterator<HttpHeader> iter1 = response.getHeaders().all().iterator();

				while (iter1.hasNext()) {
					HttpHeader header = iter1.next();
					Iterator<String> iter2 = header.values().iterator();

					while (iter2.hasNext()) {
						String value = iter2.next();
						httpServletResponse.addHeader(header.key(), value);
					}
				}

				writeAndTranslateExceptions(httpServletResponse, response.getBody());

			} else {
				httpServletResponse.sendError(404);
			}

		}
	}

	private static void writeAndTranslateExceptions(HttpServletResponse httpServletResponse, byte[] content) {
		try {
			ServletOutputStream e = httpServletResponse.getOutputStream();
			e.write(content);
			e.flush();
			e.close();
		} catch (IOException var3) {
			Exceptions.throwUnchecked(var3);
		}

	}

	@Override
	public int port() {
		throw new UnsupportedOperationException("Server port number cannot be retrieved");
	}

	@Override
	public void shutdown() {
		throw new UnsupportedOperationException("Stopping the server is not supported");
	}

	@Override
	public void stop() {
	}

	@Override
	public void start() {
		ServletRegistration.Dynamic mock = context.addServlet(app.getMockId() + "-mock", this);
		mock.setLoadOnStartup(1);
		mock.addMapping("/" + app.getMockId() + "/*");
	}

	public boolean isRunning() {
		return true;
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
