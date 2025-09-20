package thapo.pocspring.web.public_api.todo;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import thapo.pocspring.domain.todo.TodoDto;
import thapo.pocspring.web.public_api.PublicApiController;
import thapo.pocspring.web.public_api.todo.create_todo.CreateTodoAction;
import thapo.pocspring.web.public_api.todo.create_todo.CreateTodoResDto;
import thapo.pocspring.web.public_api.todo.fetch_todos.FetchTodosAction;
import thapo.pocspring.web.public_api.todo.fetch_todos.FetchTodosResDto;

@RestController
@RequestMapping(TodoController.PATH)
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TodoController {
    public static final String PATH = PublicApiController.PATH + "/todo";

    private final FetchTodosAction fetchTodosAction;
    private final CreateTodoAction createTodoAction;

    @RequestMapping(method = RequestMethod.GET, path = FetchTodosAction.PATH)
    public ResponseEntity<FetchTodosResDto> fetchTodos() {
        return ResponseEntity.ok()
                .body(fetchTodosAction.fetchTodos());
    }


    @RequestMapping(method = RequestMethod.POST, path = CreateTodoAction.PATH)
    public ResponseEntity<CreateTodoResDto> createTodo(@RequestBody final TodoDto todoDto) {
        return ResponseEntity.ok()
                .body(createTodoAction.createTodo(todoDto));
    }
}
