package works.lucid.diorama;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		super.addResourceHandlers(registry);
		if (!registry.hasMappingForPattern("/diorama-ui/**")) {
			registry.addResourceHandler("/diorama-ui/**").addResourceLocations("classpath:/META-INF/resources/webjars/diorama-ui/");
		}
	}
}
