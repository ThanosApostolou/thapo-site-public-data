package javaconc.thread;

import javaconc.Utils;

import java.security.MessageDigest;
import java.time.Instant;
import java.util.UUID;

public class MyTaskCpu implements Runnable {
    private final MyState myState;

    public MyTaskCpu(final MyState myState) {
        this.myState = myState;
    }

    @Override
    public void run() {
        System.out.printf("START child thread name=%s, id=%s%n", Thread.currentThread().getName(), Thread.currentThread().threadId());
        final long startTs = Instant.now().toEpochMilli();

        try {
            String hash;
            long tries = 0;
            do {
                final MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
                hash = Utils.hash(messageDigest, UUID.randomUUID().toString());
                tries++;
            } while (!hash.startsWith("0000"));
            final MyState.TaskInfo taskInfo = new MyState.TaskInfo(Thread.currentThread().getName(), Thread.currentThread().threadId(),
                    startTs, Instant.now().toEpochMilli(), hash, tries);
            myState.syncUpdate(taskInfo);
            Thread.sleep(1000);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        System.out.printf("END child thread name=%s, id=%s%n", Thread.currentThread().getName(), Thread.currentThread().threadId());

    }


}
