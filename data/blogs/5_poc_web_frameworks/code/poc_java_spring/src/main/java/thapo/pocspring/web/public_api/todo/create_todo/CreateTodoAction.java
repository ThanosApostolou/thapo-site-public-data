package thapo.pocspring.web.public_api.todo.create_todo;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import thapo.pocspring.domain.todo.Todo;
import thapo.pocspring.domain.todo.TodoDto;
import thapo.pocspring.domain.todo.TodoRepository;
import thapo.pocspring.domain.todo.TodoService;
import thapo.pocspring.infrastructure.error.AppException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CreateTodoAction {
    public static final String PATH = "/create_todo";

    private final TodoRepository todoRepository;
    private final TodoService todoService;


    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public CreateTodoResDto createTodo(final TodoDto todoDto) {
        final List<String> errors = new ArrayList<>();
        Todo todo = todoService.createNew(todoDto, errors);
        if (!errors.isEmpty() || todo == null) {
            throw new AppException(errors);
        }
        todo = todoRepository.save(todo);
        return new CreateTodoResDto(todo.getId());
    }
}
