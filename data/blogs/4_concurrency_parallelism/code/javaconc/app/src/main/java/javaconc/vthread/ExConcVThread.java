package javaconc.vthread;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ExConcVThread {


    public static MyState runCpu() throws InterruptedException {
        System.out.printf("START parent thread name=%s, id=%s%n", Thread.currentThread().getName(), Thread.currentThread().threadId());
        final long startTs = Instant.now().toEpochMilli();
        final List<Runnable> runnables = new ArrayList<>();
        final MyState myState = new MyState();
        for (int i = 0; i < 500; i++) {
            runnables.add(new MyTaskCpu(myState));
        }
        try (final ExecutorService executorService = Executors.newVirtualThreadPerTaskExecutor()) {
            final List<Future<?>> futures = new ArrayList<>();
            // start runnables
            for (final Runnable runnable : runnables) {
                final Future<?> future = executorService.submit(runnable);
                futures.add(future);
            }
            // wait all runnables to finish
            for (final Future<?> future : futures) {
                future.get();
            }
            executorService.shutdown();
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }

        final long endTs = Instant.now().toEpochMilli();
        System.out.printf("END parent thread name=%s, id=%s, myState=%s, duration=%sms%n", Thread.currentThread().getName(), Thread.currentThread().threadId(), myState, endTs - startTs);
        return myState;
    }

    public static MyState runIO() throws InterruptedException {
        System.out.printf("START parent thread name=%s, id=%s%n", Thread.currentThread().getName(), Thread.currentThread().threadId());
        final long startTs = Instant.now().toEpochMilli();
        final List<Runnable> runnables = new ArrayList<>();
        final MyState myState = new MyState();
        for (int i = 0; i < 500; i++) {
            runnables.add(new MyTaskIO(myState));
        }
        try (final ExecutorService executorService = Executors.newVirtualThreadPerTaskExecutor()) {
            final List<Future<?>> futures = new ArrayList<>();
            // start runnables
            for (final Runnable runnable : runnables) {
                final Future<?> future = executorService.submit(runnable);
                futures.add(future);
            }
            // wait all runnables to finish
            for (final Future<?> future : futures) {
                future.get();
            }
            executorService.shutdown();
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }

        final long endTs = Instant.now().toEpochMilli();
        System.out.printf("END parent thread name=%s, id=%s, myState=%s, duration=%sms%n", Thread.currentThread().getName(), Thread.currentThread().threadId(), myState, endTs - startTs);
        return myState;
    }

}
