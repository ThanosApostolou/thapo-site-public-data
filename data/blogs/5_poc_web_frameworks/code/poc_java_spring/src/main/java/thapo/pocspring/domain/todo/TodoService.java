package thapo.pocspring.domain.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class TodoService {
    private final TodoValidator todoValidator;

    @Autowired
    public TodoService(final TodoValidator todoValidator) {
        this.todoValidator = todoValidator;
    }


    public Todo createNew(final TodoDto todoDto, final List<String> errors) {
        final String title = todoValidator.validateTitle(todoDto.getTitle(), errors);
        final String description = todoValidator.validateDescription(todoDto.getDescription(), errors);
        final OffsetDateTime dueDate = todoValidator.validateDueDate(todoDto.getDueDate(), errors);
        if (!errors.isEmpty()) {
            return null;
        }

        final Todo todo = new Todo();
        todo.setTitle(title);
        todo.setDescription(description);
        todo.setDueDate(dueDate);
        return todo;
    }
}
