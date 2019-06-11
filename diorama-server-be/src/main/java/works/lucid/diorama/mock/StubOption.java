package works.lucid.diorama.mock;

public class StubOption {

	private String name;
	
	private String mapping;
	
	public StubOption() {
	}
	
	public StubOption(String name, String mapping) {
		this.name = name;
		this.mapping = mapping;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMapping() {
		return mapping;
	}

	public void setMapping(String mapping) {
		this.mapping = mapping;
	}
	
}
