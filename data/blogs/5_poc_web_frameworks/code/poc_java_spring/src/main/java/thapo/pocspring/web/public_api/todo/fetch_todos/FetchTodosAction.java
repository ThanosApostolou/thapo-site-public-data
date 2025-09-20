package thapo.pocspring.web.public_api.todo.fetch_todos;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import thapo.pocspring.domain.todo.Todo;
import thapo.pocspring.domain.todo.TodoDto;
import thapo.pocspring.domain.todo.TodoRepository;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class FetchTodosAction {
    public static final String PATH = "/fetch_todos";

    private final TodoRepository todoRepository;

    @Transactional(isolation = Isolation.READ_COMMITTED, readOnly = true)
    public FetchTodosResDto fetchTodos() {
        final Iterable<Todo> todos = todoRepository.findAll();
        final List<TodoDto> todoDtos = StreamSupport.stream(todos.spliterator(), false)
                .map(TodoDto::fromTodo)
                .toList();
        return new FetchTodosResDto(todoDtos);
    }
}
