package thapo.pocspring.web.public_api.todo.fetch_todos;

import thapo.pocspring.domain.todo.TodoDto;

import java.util.List;

public record FetchTodosResDto(List<TodoDto> todos) {
}
