package works.lucid.diorama.mock;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by van481 on 7/29/16.
 */
public class StubConfig {

	private String stubId;

	private String description;

	private String value;

	private List<StubOption> options;

	private Map<String, StubOption> optionsMap;

	public StubConfig() {
	}

	public void setOptions(List<StubOption> options) {
		this.options = options;
		this.optionsMap = new LinkedHashMap<>();
		for (StubOption stubOption : options) {
			optionsMap.put(stubOption.getName(), stubOption);
		}
	}

	public List<StubOption> getOptions() {
		return options;
	}

	public StubOption getOption(String name) {
		return optionsMap.get(name);
	}

	public void setStubId(String stubId) {
		this.stubId = stubId;
	}

	public String getStubId() {
		return stubId;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

}
