package works.lucid.diorama.mock;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.github.tomakehurst.wiremock.common.FileSource;
import com.github.tomakehurst.wiremock.common.TextFile;
import com.github.tomakehurst.wiremock.standalone.MappingsSource;
import com.github.tomakehurst.wiremock.stubbing.StubMapping;
import com.github.tomakehurst.wiremock.stubbing.StubMappings;
import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;

/**
 * Created by van481 on 8/3/16.
 */
class MockMappingsSource implements MappingsSource {
	private final FileSource mappingsFileSource;

	private MockApp mockApp;

	public MockMappingsSource(MockApp mockApp) {
		this.mockApp = mockApp;
		this.mappingsFileSource = mockApp.getFileSource().child("mappings");
	}

	@Override
	public void saveMappings(StubMappings stubMappings) {

	}

	@Override
	public void loadMappingsInto(StubMappings stubMappings) {
		List<String> mappingDescriptors = new ArrayList<>();
		List<StubConfig> stubConfigList = mockApp.getStubConfigList();

		for (StubConfig stubConfig : stubConfigList) {
			String fileName = stubConfig.getOption(stubConfig.getValue()).getMapping();
			mappingDescriptors.add(fileName);
		}

		Iterable<TextFile> mappingFiles = Iterables.filter(this.mappingsFileSource.listFilesRecursively(),
				included(mappingDescriptors));
		for (TextFile mappingFile : mappingFiles) {
			StubMapping mapping = StubMapping.buildFrom(mappingFile.readContentsAsString());
			mapping.setTransient(false);
			stubMappings.addMapping(mapping);
		}

	}

	private Predicate<TextFile> included(final List<String> mappingDescriptors) {
		return new Predicate<TextFile>() {
			@Override
			public boolean apply(TextFile input) {
				final String mappingFileName = Paths.get(input.getUri()).getFileName().toString();
				return mappingDescriptors.stream().anyMatch(d -> mappingFileName.startsWith(d));
			}
		};
	}
}
