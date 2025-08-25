package javaconc.thread;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;

public class MyTaskIO implements Runnable {
    private final MyState myState;

    public MyTaskIO(final MyState myState) {
        this.myState = myState;
    }

    @Override
    public void run() {
        System.out.printf("START child thread name=%s, id=%s%n", Thread.currentThread().getName(), Thread.currentThread().threadId());
        final long startTs = Instant.now().toEpochMilli();
        try {
            final String fileContent = readFile();
            final String httpResult = getHttp(fileContent);
            final String limitedResult = httpResult.length() > 500 ? httpResult.substring(0, 500) : httpResult;

            final MyState.TaskInfo taskInfo = new MyState.TaskInfo(Thread.currentThread().getName(), Thread.currentThread().threadId(),
                    startTs, Instant.now().toEpochMilli(), limitedResult, 1);
            myState.syncUpdate(taskInfo);
        } catch (IOException | URISyntaxException | InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.printf("END child thread name=%s, id=%s%n", Thread.currentThread().getName(), Thread.currentThread().threadId());
    }

    private String readFile() throws IOException {
        final Path path = Path.of("data/url.txt");
        final String fileContent = Files.readString(path, StandardCharsets.UTF_8);
        return fileContent;
    }

    private String getHttp(final String url) throws IOException, InterruptedException, URISyntaxException {
        try (final HttpClient httpClient = HttpClient.newHttpClient()) {
            final HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(new URI(url))
                    .GET()
                    .build();
            final HttpResponse<String> result = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            return result.body();
        }
    }


}
