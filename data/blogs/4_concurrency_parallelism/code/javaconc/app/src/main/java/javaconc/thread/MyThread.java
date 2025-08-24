package javaconc.thread;

import javaconc.Utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.UUID;

public class MyThread extends Thread {
    private final MyState myState;
    private final MessageDigest messageDigest;

    public MyThread(final MyState myState) {
        this.myState = myState;
        try {
            messageDigest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void run() {
        System.out.printf("START child thread name=%s, id=%s%n", Thread.currentThread().getName(), Thread.currentThread().threadId());
        final long startTs = Instant.now().toEpochMilli();

        try {
            String hash;
            long tries = 0;
            do {
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
