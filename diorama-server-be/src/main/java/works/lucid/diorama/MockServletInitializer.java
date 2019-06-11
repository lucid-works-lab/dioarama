package works.lucid.diorama;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Scanner;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.embedded.ServletContextInitializer;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

import works.lucid.diorama.mock.MockConfig;
import works.lucid.diorama.mock.MockContainerRegistry;
import works.lucid.diorama.mock.MockServer;
import works.lucid.diorama.mock.MockServlet;
import works.lucid.diorama.mock.MockContainer.Type;

@Configuration
public class MockServletInitializer implements ServletContextInitializer {

	private final Logger log = LoggerFactory.getLogger(getClass());

	public void onStartup(ServletContext servletContext) throws ServletException {
		try {

			String dioramaConfigPath = System.getProperty("diorama.config");

			List<MockConfig> dioramaConfig = unmarshalDioramaConfig(dioramaConfigPath);

			for (MockConfig mockConfig : dioramaConfig) {
				if (Type.Servlet.equals(mockConfig.mockType)) {
					MockContainerRegistry.registerMockContainer(new MockServlet(mockConfig, servletContext));
				} else if (Type.Server.equals(mockConfig.mockType)) {
					MockContainerRegistry.registerMockContainer(new MockServer(mockConfig));
				}
			}
			log.info("Mocks has been registered");
		} catch (Throwable t) {
			log.error("Error to register mock", t);
		}

		MockContainerRegistry.getMockContainers().forEach((mockContainer) -> {
			try {
				mockContainer.start();
				log.info("Mock " + mockContainer.getMockId() + " has been started");
			} catch (Throwable t) {
				log.error("Error to start mock " + mockContainer.getMockId(), t);
			}
		});
	}

	private static List<MockConfig> unmarshalDioramaConfig(String requestFilePath) throws Exception {
		ObjectMapper mapper = new ObjectMapper();

		SimpleModule module = new SimpleModule();
		mapper.registerModule(module);

		List<MockConfig> mockConfigList = mapper.readValue(readFile(requestFilePath),
				new TypeReference<List<MockConfig>>() {
				});

		for (MockConfig mockConfig : mockConfigList) {
			mockConfig.mockDir = new File(requestFilePath).getParent().toString() + "/" + mockConfig.mockId;
		}

		return mockConfigList;
	}

	private static String readFile(String filePath) throws IOException {
		try (Scanner scanner = new Scanner(new FileInputStream(filePath), "UTF-8")) {
			return scanner.useDelimiter("\\A").next();
		}
	}
}
