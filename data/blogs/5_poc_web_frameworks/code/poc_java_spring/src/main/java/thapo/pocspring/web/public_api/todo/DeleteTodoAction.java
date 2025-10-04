package thapo.pocspring.web.public_api.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import thapo.pocspring.domain.todo.TodoRepository;
import thapo.pocspring.domain.todo.TodoService;
import thapo.pocspring.infrastructure.error.AppException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class DeleteTodoAction {

    private final TodoRepository todoRepository;
    private final TodoService todoService;


    public record DeleteTodoResDto(boolean success) {
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public DeleteTodoResDto deleteTodo(final long id) {
        final List<String> errors = new ArrayList<>();
        todoService.delete(id, errors);
        if (!errors.isEmpty()) {
            throw new AppException(errors);
        }
        return new DeleteTodoResDto(true);
    }

}
