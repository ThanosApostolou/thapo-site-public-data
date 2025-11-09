package thapo.pocspring.web.mpa.about;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;

@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AboutActions {

    @Transactional
    public void aboutModel(Model model) {
        model.addAttribute("name", "aboutPage");
    }
}
