package thapo.pocspring.web.public_api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(PublicApiController.PATH)
public class PublicApiController {
    public static final String PATH = "/public_api";

    @RequestMapping(method = RequestMethod.GET, path = "/getTest", produces = "text/plain")
    public ResponseEntity<String> getTest() {
        return ResponseEntity.ok()
                .body("some test message");
    }
}
