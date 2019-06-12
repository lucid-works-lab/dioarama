package works.lucid.diorama.mock;

import com.github.tomakehurst.wiremock.http.Request;
import com.github.tomakehurst.wiremock.http.Response;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;

/**
 * Created by michaellif on 8/10/16.
 */
@XmlRootElement
public class MockRequestItem {

    public String mockId;

    public long index;

    public String url;

    public String method;

    public String requestHeaders;

    public String requestBody;

    public int responseStatus;

    public String responseHeaders;

    public String responseBody;

    public Date requestTime;

    public MockRequestItem(String mockId, Request request, Response response, long index) {
        this.mockId = mockId;
        this.index = index;
        this.url = request.getUrl();
        this.method = request.getMethod().value();
        this.requestHeaders = request.getHeaders().toString();
        if(request.getBody()!=null) {
            this.requestBody = request.getBodyAsString();
        }
        this.responseStatus = response.getStatus();
        this.responseHeaders = response.getHeaders().toString();
        if(response.getBody()!=null) {
            this.responseBody = response.getBodyAsString();
        }
        requestTime = new Date();
    }
}
