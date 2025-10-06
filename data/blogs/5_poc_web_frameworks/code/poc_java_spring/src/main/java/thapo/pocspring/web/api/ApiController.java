package thapo.pocspring.web.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiController.PATH)
public class ApiController {
    public static final String PATH = "/api";

    @RequestMapping(method = RequestMethod.GET, path = "/getTest", produces = "text/plain")
    public ResponseEntity<String> getTest() {
        return ResponseEntity.ok()
                .body("some test message from protected api");
    }
}
