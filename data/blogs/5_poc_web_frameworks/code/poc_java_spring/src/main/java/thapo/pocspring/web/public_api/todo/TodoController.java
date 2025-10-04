package thapo.pocspring.web.public_api.todo;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thapo.pocspring.domain.todo.TodoDto;
import thapo.pocspring.web.public_api.PublicApiController;

@RestController
@RequestMapping(TodoController.PATH)
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TodoController {
    public static final String PATH = PublicApiController.PATH + "/todo";

    private final FetchTodosAction fetchTodosAction;
    private final FetchTodoAction fetchTodoAction;
    private final CreateTodoAction createTodoAction;
    private final DeleteTodoAction deleteTodoAction;
    private final UpdateTodoAction updateTodoAction;

    @RequestMapping(method = RequestMethod.GET, path = "/fetch_todos", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FetchTodosAction.FetchTodosResDto> fetchTodos() {
        return ResponseEntity.ok()
                .body(fetchTodosAction.fetchTodos());
    }

    @RequestMapping(method = RequestMethod.GET, path = "/fetch_todo", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FetchTodoAction.FetchTodoResDto> fetchTodo(@RequestParam long id) {
        return ResponseEntity.ok()
                .body(fetchTodoAction.fetchTodo(id));
    }


    @RequestMapping(method = RequestMethod.POST, path = "/create_todo", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CreateTodoAction.CreateTodoResDto> createTodo(@RequestBody final TodoDto todoDto) {
        return ResponseEntity.ok()
                .body(createTodoAction.createTodo(todoDto));
    }


    @RequestMapping(method = RequestMethod.DELETE, path = "/delete_todo", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DeleteTodoAction.DeleteTodoResDto> deleteTodo(@RequestParam final long id) {
        return ResponseEntity.ok()
                .body(deleteTodoAction.deleteTodo(id));
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/update_todo", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UpdateTodoAction.UpdateTodoResDto> updateTodo(@RequestBody final TodoDto todoDto) {
        return ResponseEntity.ok()
                .body(updateTodoAction.updateTodo(todoDto));
    }
}
