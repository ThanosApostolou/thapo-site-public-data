package javaconc.thread;

import java.util.ArrayList;
import java.util.List;

public class ExConcThread {

    public static MyState run() throws InterruptedException {
        System.out.printf("START parent thread name=%s, id=%s%n", Thread.currentThread().getName(), Thread.currentThread().threadId());
        final List<Thread> threads = new ArrayList<>();
        final MyState myState = new MyState();
        for (int i = 0; i < 10; i++) {
            threads.add(new MyThread(myState));
        }
        // start threads
        for (final Thread thread : threads) {
            thread.start();
        }
        // wait all threads to finish
        for (final Thread thread : threads) {
            thread.join();
        }

        System.out.printf("END parent thread name=%s, id=%s, myState=%s%n", Thread.currentThread().getName(), Thread.currentThread().threadId(), myState);
        return myState;
    }
}
