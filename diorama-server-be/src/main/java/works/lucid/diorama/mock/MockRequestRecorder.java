package works.lucid.diorama.mock;

import com.github.tomakehurst.wiremock.http.Request;
import com.github.tomakehurst.wiremock.http.RequestListener;
import com.github.tomakehurst.wiremock.http.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * Created by michaellif on 8/10/16.
 */
public class MockRequestRecorder implements RequestListener {

    private static final Logger log = LoggerFactory.getLogger(MockApp.class);

    private static final int QUEUE_MAX_SIZE = 200;

    private static volatile long headIndex;

    private static Map<Long, MockRequestItem> itemQueue = new HashMap<>();

    private MockApp mockApp;

    public MockRequestRecorder(MockContainer container) {
        this.mockApp = container.getMockApp();
    }

    @Override
    public void requestReceived(Request request, Response response) {
        log.info("Request received ({}):\n{}\n", mockApp.getMockId(), request);
        log.info("Response status ({}):\n{}\n", mockApp.getMockId(), response.getStatus());
        log.info("Response headers ({}):\n{}\n", mockApp.getMockId(), response.getHeaders());
        if (response.getBody() != null) {
            log.info("Response body ({}):\n{}\n", mockApp.getMockId(), response.getBodyAsString());
        }
        addItem(new MockRequestItem(mockApp.getMockId(), request, response, ++headIndex));
    }

    private static synchronized void addItem(MockRequestItem item) {
        itemQueue.put(item.index, item);
        if (itemQueue.containsKey(item.index - QUEUE_MAX_SIZE)) {
            itemQueue.remove(item.index - QUEUE_MAX_SIZE);
        }
    }

    public static synchronized MockRequestItem getItem(long index) {
        return itemQueue.get(index);
    }

    public static synchronized List<MockRequestItem> getItems(long indexTo, int size) {
        ArrayList<MockRequestItem> list = new ArrayList<>();
        for (long i = headIndex; i >= indexTo && size > 0; i--) {
            if(itemQueue.containsKey(i)) {
                list.add(itemQueue.get(i));
                size--;
            }
        }
        return list;
    }
}
