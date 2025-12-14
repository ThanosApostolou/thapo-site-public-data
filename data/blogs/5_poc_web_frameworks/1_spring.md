# Spring

## DOCS
Spring: https://docs.spring.io/spring-framework/reference/

Spring BOOT: https://docs.spring.io/spring-boot/reference/


## HTTP Rest API

### RestController and RequestMapping
[spring-framework/reference/web/webmvc/mvc-controller/ann](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann.html): @RestController is a composed annotation that is itself meta-annotated with @Controller and @ResponseBody to indicate a controller whose every method inherits the type-level @ResponseBody annotation and, therefore, writes directly to the response body versus view resolution and rendering with an HTML template.

```java
@RestController
@RequestMapping("/api/todo")
public class TodoController {}
```

[spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html). You can use the @RequestMapping annotation to map requests to controllers methods. It has various attributes to match by URL, HTTP method, request parameters, headers, and media types. You can use it at the class level to express shared mappings or at the method level to narrow down to a specific endpoint mapping.

```java
@RequestMapping(method = RequestMethod.GET, path = "/fetch_todos", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<FetchTodosResDto> fetchTodos() {
    return ResponseEntity.ok()
            .body(new FetchTodosResDto());
}
```

### HTTP methods, produces, accepts
We can specify HTTP methods (method = RequestMethod.xxx):
- RequestMethod.GET
- RequestMethod.HEAD
- RequestMethod.POST
- RequestMethod.PUT
- RequestMethod.PATCH
- RequestMethod.DELETE
- RequestMethod.OPTIONS
- RequestMethod.TRACE

We can specify `produces="some/mediaType"` (or `produces={"some/mediaType", "other/mediaType"}`) and `accepts="some/mediaType"` (or `accepts={"some/mediaType", "other/mediaType"}`). Preferably to use MediaType constants like `MediaType.APPLICATION_JSON_VALUE`.

### Method Arguments:
[Spring Web MVC/Annotated Controllers/Handler Methods/Method Arguments](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/arguments.html)

- WebRequest, NativeWebRequest
- jakarta.servlet.ServletRequest, jakarta.servlet.ServletResponse
- jakarta.servlet.http.HttpSession
- jakarta.servlet.http.PushBuilder (for http2)
- java.security.Principal
- @AuthenticationPrincipal AuthenticatedPrincipal (or super interface/class like OAuth2AuthenticatedPrincipal)
- HttpMethod
- java.util.Locale
- java.util.TimeZone + java.time.ZoneId
- java.io.InputStream, java.io.Reader (raw request body)
- java.io.OutputStream, java.io.Writer (raw response body)
- @PathVariable
- @MatrixVariable
- @RequestParam
- @RequestHeader
- @CookieValue
- @RequestBody
- `HttpEntity<B>`
- @RequestPart
- java.util.Map, org.springframework.ui.Model, org.springframework.ui.ModelMap
- RedirectAttributes
- @ModelAttribute
- Errors, BindingResult
- SessionStatus + class-level @SessionAttributes
- UriComponentsBuilder
- @SessionAttribute
- @RequestAttribute

### Return Values:
[Spring Web MVC/Annotated Controllers/Handler Methods/Return Values](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/return-types.html)
- @ResponseBody
- `HttpEntity<B>`, `ResponseEntity<B>`
- HttpHeaders
- ErrorResponse, ProblemDetail
- String
- View
- java.util.Map, org.springframework.ui.Model
- @ModelAttribute
- ModelAndView object
- FragmentsRendering, Collection<ModelAndView>
- void
- DeferredResult<V>
- Callable<V>
- ListenableFuture<V>, java.util.concurrent.CompletionStage<V>, java.util.concurrent.CompletableFuture<V>
- ResponseBodyEmitter, SseEmitter
- StreamingResponseBody

## HTTP html templates
TODO

## Files Resources

### Static Resources
- [Spring Web MVC/MVC Config/Static Resources](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-config/static-resources.html)

See implementation `thapo.pocspring.infrastructure.web.WebMvcConfig.addResourceHandlers()`

### Dynamic Resources
- [Core Technologies/Resources](https://docs.spring.io/spring-framework/reference/core/resources.html)

See implementation `thapo.pocspring.web.public_api.file.FileController`

## HTTP Stream
[Spring Web MVC/Asynchronous Requests#mvc-ann-async-http-streaming](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-async.html#mvc-ann-async-http-streaming)


See implementation `thapo.pocspring.web.public_api.stream.StreamController.fetchStream()`

## CORS
- [Web on Servlet Stack/Spring Web MVC/CORS](https://docs.spring.io/spring-framework/reference/web/webmvc-cors.html)

See implementation `thapo.pocspring.infrastructure.web.WebMvcConfig.addCorsMappings()`

When using Spring security use
```java
http.cors(Customizer.withDefaults()) // use WebMVC cors configuration
```
in order to use same configuration as WebMVC

## Auth
https://docs.spring.io/spring-security/reference/servlet/configuration/java.html
https://www.baeldung.com/spring-boot-keycloak

## WebSockets
- [Web on Servlet Stack/WebSockets](https://docs.spring.io/spring-framework/reference/web/websocket.html)
- [Using WebSocket to build an interactive web application](https://spring.io/guides/gs/messaging-stomp-websocket)
- [Spring Boot + WebSocket example without STOMP and SockJs](https://www.devglan.com/spring-boot/spring-websocket-integration-example-without-stomp#:~:text=This%20means%20when%20we%20do,make%20websocket%20connection%20without%20STOMP.)

See implementation `thapo.pocspring.infrastructure.web.WebSocketConfig` and `thapo.pocspring.web.ws.ChatWebSocketHandler`

## GraphQL
TODO


## Logging
- https://docs.spring.io/spring-framework/reference/core/spring-jcl.html
- https://docs.spring.io/spring-boot/reference/features/logging.html


## OpenAPI
- https://springdoc.org

Add dependency `implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:3.0.0")`


## Metrics

properties:
```yaml
management:
  endpoints:
    web:
      exposure:
        include: [ 'health', 'prometheus' ]
```

## Testing

## Database
DOCS: https://docs.spring.io/spring-framework/reference/data-access.html

spring data jpa

spring jdbc templates

connection pool (HikariCP)
