package works.lucid.diorama;

import java.io.Serializable;
import java.util.Comparator;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SettingsPrintOut implements CommandLineRunner {
    private static final Logger LOGGER = LoggerFactory.getLogger(SettingsPrintOut.class);

    @Override
    public void run(String... args) throws Exception {
        LOGGER.info(getSettings());
    }

	public static String getSettings() {
		StringBuilder output = new StringBuilder();

		output.append("\n========System.getProperties()=========\n");
		System.getProperties().entrySet().stream().sorted(comparingByKey())
				.forEach(
						entry -> output.append(entry.getKey()).append("=").append(entry.getValue()).append("\n")
				);
		
		output.append("\n========System.getenv()=========\n");
		System.getenv().entrySet().stream().sorted(Entry.comparingByKey())
				.forEach(
						entry -> output.append(entry.getKey()).append("=").append(entry.getValue()).append("\n")
				);

		return output.toString();
	}

	private static Comparator<Map.Entry<Object, Object>> comparingByKey() {
		return (Comparator<Map.Entry<Object, Object>> & Serializable)
				(c1, c2) -> c1.getKey().toString().compareTo(c2.getKey().toString());
	}
}

