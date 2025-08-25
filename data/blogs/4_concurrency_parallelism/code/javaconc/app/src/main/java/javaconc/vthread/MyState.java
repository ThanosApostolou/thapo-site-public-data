package javaconc.vthread;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyState {
    private long totalTries = 0;
    private final List<String> results = new ArrayList<>();
    private final List<TaskInfo> taskInfos = new ArrayList<>();

    public static record TaskInfo(String name, long id, long startTs, long endTs, String result, long tries) {
    }

    public synchronized void syncUpdate(final TaskInfo taskInfo) {
        totalTries += taskInfo.tries;
        results.add(taskInfo.result);
        taskInfos.add(taskInfo);
    }

    public synchronized long getTotalTries() {
        return totalTries;
    }

    public synchronized List<String> getResults() {
        return Collections.unmodifiableList(results);
    }

    public synchronized List<TaskInfo> getTaskInfos() {
        return Collections.unmodifiableList(taskInfos);
    }

    @Override
    public synchronized String toString() {
        return "MyState{" +
                "totalTries=" + totalTries +
                ", hashes=" + results +
                ", taskInfos=" + taskInfos +
                '}';
    }
}
