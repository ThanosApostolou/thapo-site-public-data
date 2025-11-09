# Concurrency and Parallelism

## Processes
Examples:
- Apache HTTP [Apache HTTP Server — Multi-process architecture](https://medium.com/brundas-tech-notes/apache-http-server-multi-process-architecture-8fb14438a2ce)
- Firefox multi process
- Chrome tabs
- VS Code extension host process
- Node server using process managers like PM2

## Threads (Platform Threads, OS Threads)


Examples:
- Rust Threads
- Java Threads
- Node worker threads
- Spring MVC thread-per-request model


## Stackless Coroutines (Async, Cooperative scheduler)
[An Introduction to Asynchronous Programming in Rust and a High-level Overview of Tokio's Architecture](https://moslehian.com/posts/2023/1-intro-async-rust-tokio/)

- 1 event loop: e.g. Node.js
- separate event loops: e.g. Vertx event loop per verticle
- task stealing event loops: rust tokio

Examples:
- Node async functions


## Stackful Coroutines (Fibers, Green threads, Virtual threads, Preemptive scheduler)
[Fibers under the magnifying glass](https://www.open-std.org/JTC1/SC22/WG21/docs/papers/2018/p1364r0.pdf)
[Rust 0000-remove-runtime.md](https://github.com/aturon/rfcs/blob/remove-runtime/active/0000-remove-runtime.md)
[Concurrency in Go vs Rust/C++: Goroutines vs Coroutines](https://leapcell.medium.com/concurrency-in-go-vs-rust-c-goroutines-vs-coroutines-b0fa4769b771)
[The downsides of C++ Coroutines](https://reductor.dev/cpp/2023/08/10/the-downsides-of-coroutines.html)
[A Deep Dive into Green Threads and Node.js ](https://dev.to/ocodista/a-deep-dive-into-green-threads-and-nodejs-15c3)

Examples:
- GO goroutines
- Java Virtual Threads
