# TypeScript rust-like Result Type and type safe handling of unknown

Rust [Result enum](https://doc.rust-lang.org/std/result/) provides one of the best data type in order to handle errors. A `Result` type is actually a more specific case to a general `Either` Type found in many programming languages. The general Either type indicates a datatype which can be either `Some` data type or `Other` data type. The result type gives semantic meaning to these types, so it can be either an `Ok` type indicating a success result, or an `Err` type indicating an error result. We will see how we can simply create this `Result` type in typescript without any external libraries.

TypeScript provides us the ability to mark simply JavaScript code with static data types. However, these data types are not persisted in runtime and when external data is handled in the system there no guarantees that a data type is the correct one. Problem arises often when data are fetched from some rest api, or when javascript libraries are used with no or purely written types annotations.

You can see the full code in [https://github.com/ThanosApostolou/thapo-site-public-data/tree/main/data/blogs/2_typescript_result_unknown/code](https://github.com/ThanosApostolou/thapo-site-public-data/tree/main/data/blogs/2_typescript_result_unknown/code)
