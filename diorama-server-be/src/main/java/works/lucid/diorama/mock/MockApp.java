package works.lucid.diorama.mock;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.urlMatching;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.common.FileSource;
import com.github.tomakehurst.wiremock.common.KeyStoreSettings;
import com.github.tomakehurst.wiremock.core.WireMockApp;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;
import com.github.tomakehurst.wiremock.extension.ResponseDefinitionTransformer;
import com.github.tomakehurst.wiremock.extension.ResponseTransformer;
import com.github.tomakehurst.wiremock.http.AdminRequestHandler;
import com.github.tomakehurst.wiremock.http.BasicResponseRenderer;
import com.github.tomakehurst.wiremock.http.ProxyResponseRenderer;
import com.github.tomakehurst.wiremock.http.StubRequestHandler;
import com.github.tomakehurst.wiremock.http.StubResponseRenderer;
import com.github.tomakehurst.wiremock.matching.RequestMatcherExtension;
import com.github.tomakehurst.wiremock.servlet.NotImplementedContainer;
import com.google.common.collect.ImmutableList;

/**
 * Created by michaellif on 6/24/16.
 */
public final class MockApp {

	private static final Logger log = LoggerFactory.getLogger(MockApp.class);

	private static final int PROXY_PRIORITY = Integer.MAX_VALUE;

	private static final String MOCK_PROPERTY_FILE = "mock.properties";

	private static final String PROXIED_FROM_PROPERTY_NAME = "proxied-from.url";

	private static final String HTTP_PROXY_HOST_PROPERTY_NAME = "http-proxy-host";
	private static final String HTTP_PROXY_PORT_PROPERTY_NAME = "http-proxy-port";

	private static final String PORT_PROPERTY_NAME = "port";
	private static final String HTTPS_PORT_PROPERTY_NAME = "httpsPort";

	private static final String UPSTREAM_KEYSTORE_PATH_PROPERTY_NAME = "upstream-keystore-path";
	private static final String UPSTREAM_KEYSTORE_PASSWORD_PROPERTY_NAME = "upstream-keytstore-password";

	private static final String UPSTREAM_TRUSTSTORE_PATH_PROPERTY_NAME = "upstream-truststore-path";
	private static final String UPSTREAM_TRUSTSTORE_PASSWORD_PROPERTY_NAME = "upstream-truststore-password";

	private static final String DOWNSTREAM_KEYSTORE_PATH_PROPERTY_NAME = "downstream-keystore-path";
	private static final String DOWNSTREAM_KEYSTORE_PASSWORD_PROPERTY_NAME = "downstream-keystore-password";

	private static Properties properties;

	static {
		properties = new Properties();
		try {
			properties.load(MockApp.class.getClassLoader().getResourceAsStream(MOCK_PROPERTY_FILE));
		} catch (IOException e) {
			throw new Error("Failed to read " + PROXIED_FROM_PROPERTY_NAME + " property " + MOCK_PROPERTY_FILE, e);
		}
	}

	private String mockId;

	private WireMockApp wireMockApp;

	private StubRequestHandler stubRequestHandler;

	private AdminRequestHandler adminRequestHandler;

	private WireMockConfiguration config;

	private MockMode mode;

	private String proxyUrlMatching;

	private String proxiedFrom;

	private final Map<String, StubConfig> stubConfigMap;

	private FileSource fileSource;

	private MockMappingsSource mappingsSource;

	public MockApp(String mockId, String mockDirectory, String proxyUrlMatching,
			List<StubConfig> stubConfigList) {
		config = WireMockConfiguration.wireMockConfig().usingFilesUnderDirectory(mockDirectory);
		configureMockProperties(mockId);
		this.mockId = mockId;
		this.proxyUrlMatching = proxyUrlMatching;

		try {
			proxiedFrom = getMockProperty(mockId, PROXIED_FROM_PROPERTY_NAME);

			fileSource = config.filesRoot();

			stubConfigMap = new LinkedHashMap<>();

			mappingsSource = new MockMappingsSource(this);

			mode = MockMode.Mock;

			if (stubConfigList != null) {
				for (StubConfig stubConfig : stubConfigList) {
					stubConfigMap.put(stubConfig.getStubId(), stubConfig);
				}
			}

			wireMockApp = new WireMockApp(config.browserProxyingEnabled(), mappingsSource, null,
					config.requestJournalDisabled(), config.maxRequestJournalEntries(),
					config.extensionsOfType(ResponseDefinitionTransformer.class),
					config.extensionsOfType(RequestMatcherExtension.class), this.fileSource,
					new NotImplementedContainer());

			stubRequestHandler = new StubRequestHandler(wireMockApp,
					new StubResponseRenderer(fileSource.child("__files"), wireMockApp.getGlobalSettingsHolder(),
							new ProxyResponseRenderer(config.proxyVia(),
									getMockProperty(mockId, MockApp.DOWNSTREAM_KEYSTORE_PATH_PROPERTY_NAME) == null
											? KeyStoreSettings.NO_STORE
											: new KeyStoreSettings(
													WireMockServer.class
															.getClassLoader()
															.getResource(getMockProperty(
																	mockId,
																	MockApp.DOWNSTREAM_KEYSTORE_PATH_PROPERTY_NAME))
															.getPath(),
													getMockProperty(mockId,
															MockApp.DOWNSTREAM_KEYSTORE_PASSWORD_PROPERTY_NAME)),
									config.shouldPreserveHostHeader(), config.proxyHostHeader()),
							ImmutableList.copyOf(config.extensionsOfType(ResponseTransformer.class).values())));

			adminRequestHandler = new AdminRequestHandler(this.wireMockApp, new BasicResponseRenderer());

		} catch (Throwable t) {
			log.error("MockApp construction failed", t);
			throw t;
		}
	}

	private void configureMockProperties(String mockId) {
		if (getMockProperty(mockId, MockApp.PORT_PROPERTY_NAME) != null) {
			config.port(Integer.parseInt(getMockProperty(mockId, MockApp.PORT_PROPERTY_NAME)));
		}
		if (getMockProperty(mockId, MockApp.HTTPS_PORT_PROPERTY_NAME) != null) {
			config.httpsPort(Integer.parseInt(getMockProperty(mockId, MockApp.HTTPS_PORT_PROPERTY_NAME)));
		}

		if (getMockProperty(mockId, MockApp.UPSTREAM_KEYSTORE_PATH_PROPERTY_NAME) != null) {
			config.keystorePath(WireMockServer.class.getClassLoader()
					.getResource(getMockProperty(mockId, MockApp.UPSTREAM_KEYSTORE_PATH_PROPERTY_NAME)).getPath())
					.keystorePassword(getMockProperty(mockId, MockApp.UPSTREAM_KEYSTORE_PASSWORD_PROPERTY_NAME));
		}

		if (getMockProperty(mockId, MockApp.UPSTREAM_TRUSTSTORE_PATH_PROPERTY_NAME) != null) {
			config.trustStorePath(WireMockServer.class.getClassLoader()
					.getResource(getMockProperty(mockId, MockApp.UPSTREAM_TRUSTSTORE_PATH_PROPERTY_NAME)).getPath())
					.trustStorePassword(
							getMockProperty(mockId, MockApp.UPSTREAM_TRUSTSTORE_PASSWORD_PROPERTY_NAME));
		}

		if (getMockProperty(mockId, MockApp.HTTP_PROXY_HOST_PROPERTY_NAME) != null) {
			config.proxyVia(getMockProperty(mockId, MockApp.HTTP_PROXY_HOST_PROPERTY_NAME),
					Integer.parseInt(getMockProperty(mockId, MockApp.HTTP_PROXY_PORT_PROPERTY_NAME)));
		}
	}

	public void setMode(MockMode mode) {
		this.mode = mode;
		applyMappings();
	}

	public void setStubConfigValue(String stubId, String value) {
		StubConfig config = stubConfigMap.get(stubId);
		if (config == null) {
			throw new Error("StubConfig is not registered");
		}
		if (config instanceof StubConfig) {
			config.setValue(config.getOption(value).getName());
		}
		applyMappings();
	}

	protected void applyMappings() {
		wireMockApp.loadMappingsUsing(mappingsSource);
		switch (mode) {
		case Mock:
			wireMockApp.resetToDefaultMappings();
			break;
		case Proxy:
			wireMockApp.resetMappings();
			addProxyMapping();
			break;
		case Interceptor:
			wireMockApp.resetToDefaultMappings();
			addProxyMapping();
			break;
		}
	}

	public String getMockId() {
		return mockId;
	}

	public MockMode getMode() {
		return mode;
	}

	public static String getMockProperty(String mockId, String key) {
		return properties.getProperty(mockId + "." + key);
	}

	public WireMockConfiguration getConfig() {
		return config;
	}

	public StubRequestHandler getStubRequestHandler() {
		return stubRequestHandler;
	}

	public AdminRequestHandler getAdminRequestHandler() {
		return adminRequestHandler;
	}

	public List<StubConfig> getStubConfigList() {
		return new ArrayList<>(stubConfigMap.values());
	}

	public FileSource getFileSource() {
		return fileSource;
	}

	public String getProxyUrlMatching() {
		return proxyUrlMatching;
	}

	public String getProxiedFrom() {
		return proxiedFrom;
	}

	private void addProxyMapping() {
		wireMockApp.addStubMapping(WireMock.any(urlMatching(proxyUrlMatching)).atPriority(PROXY_PRIORITY)
				.willReturn(aResponse().proxiedFrom(proxiedFrom)).build());
	}

}
