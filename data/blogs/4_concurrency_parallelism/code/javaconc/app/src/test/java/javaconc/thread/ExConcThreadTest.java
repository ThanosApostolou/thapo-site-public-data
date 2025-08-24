package javaconc.thread;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ExConcThreadTest {

    @Test
    void run() throws InterruptedException {
        final MyState myState = ExConcThread.run();
        assertEquals(10, myState.getHashes().size());
        assertEquals(10, myState.getTaskInfos().size());
        final long sumTries = myState.getTaskInfos().stream()
                .map(MyState.TaskInfo::tries)
                .reduce(0L, Long::sum);
        assertEquals(myState.getTotalTries(), sumTries);
    }

}