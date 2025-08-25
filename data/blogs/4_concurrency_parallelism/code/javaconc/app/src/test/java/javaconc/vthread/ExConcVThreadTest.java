package javaconc.vthread;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ExConcVThreadTest {

    @Test
    void runCpu() throws InterruptedException {
        final MyState myState = ExConcVThread.runCpu();
        assertEquals(500, myState.getResults().size());
        assertEquals(500, myState.getTaskInfos().size());
        final long sumTries = myState.getTaskInfos().stream()
                .map(MyState.TaskInfo::tries)
                .reduce(0L, Long::sum);
        assertEquals(myState.getTotalTries(), sumTries);
    }

    @Test
    void runIO() throws InterruptedException {
        final MyState myState = ExConcVThread.runIO();
        assertEquals(500, myState.getResults().size());
        assertEquals(500, myState.getTaskInfos().size());
        final long sumTries = myState.getTaskInfos().stream()
                .map(MyState.TaskInfo::tries)
                .reduce(0L, Long::sum);
        assertEquals(myState.getTotalTries(), sumTries);
    }
}