package javaconc.thread;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyState {
    private long totalTries = 0;
    private List<String> hashes = new ArrayList<>();
    private List<TaskInfo> taskInfos = new ArrayList<>();

    public static record TaskInfo(String name, long id, long startTs, long endTs, String hash, long tries) {
    }

    public synchronized void syncUpdate(final TaskInfo taskInfo) {
        totalTries += taskInfo.tries;
        hashes.add(taskInfo.hash);
        taskInfos.add(taskInfo);
    }

    public synchronized long getTotalTries() {
        return totalTries;
    }

    public synchronized List<String> getHashes() {
        return Collections.unmodifiableList(hashes);
    }

    public synchronized List<TaskInfo> getTaskInfos() {
        return Collections.unmodifiableList(taskInfos);
    }

    @Override
    public synchronized String toString() {
        return "MyState{" +
                "totalTries=" + totalTries +
                ", hashes=" + hashes +
                ", taskInfos=" + taskInfos +
                '}';
    }
}
