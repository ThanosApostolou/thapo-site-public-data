package thapo.pocspring.web.mpa;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import thapo.pocspring.web.mpa.about.AboutActions;

@Controller
@RequestMapping(MpaController.PATH)
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MpaController {
    public static final String PATH = "/mpa";

    private final AboutActions aboutActions;

    @GetMapping(path = "")
    public String indexPage() {
        return "redirect:/mpa/home";
    }


    @GetMapping(path = "home")
    public String homePage(@AuthenticationPrincipal final OAuth2AuthenticatedPrincipal oAuth2AuthenticatedPrincipal, final Model model) {
        model.addAttribute("name", oAuth2AuthenticatedPrincipal != null ? oAuth2AuthenticatedPrincipal.getName() : null);
        return "home/index";
    }


    @GetMapping("about")
    public String aboutPage(Model model) {
        aboutActions.aboutModel(model);
        return "about/index";
    }


    @GetMapping("401")
    public String notAuthorized(Model model) {
        return "401";
    }
}
