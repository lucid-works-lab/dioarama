package works.lucid.diorama.mock;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;

/**
 * Created by van481 on 6/30/16.
 */
public class MockContainerRegistry {

	private static class SingletonHolder {
		private static final MockContainerRegistry INSTANCE = new MockContainerRegistry();
	}

	private static MockContainerRegistry getInstance() {
		return SingletonHolder.INSTANCE;
	}

	private HashMap<String, MockContainer> container;

	private MockContainerRegistry() {
		container = new HashMap<>();
	}

	public static void registerMockContainer(MockContainer container) {
		getInstance().container.put(container.getMockId(), container);
	}

	public static Collection<MockContainer> getMockContainers() {
		return Collections.unmodifiableCollection(getInstance().container.values());
	}

	public static MockContainer getMockContainer(String mockId) {
		return getInstance().container.get(mockId);
	}

}
