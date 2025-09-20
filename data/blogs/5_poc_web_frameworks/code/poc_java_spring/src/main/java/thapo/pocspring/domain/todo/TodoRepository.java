package thapo.pocspring.domain.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

public interface TodoRepository extends TodoCustomRepository, CrudRepository<Todo, Long> {
}

interface TodoCustomRepository {

}

@Repository
class TodoRepositoryImpl implements TodoCustomRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    TodoRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
}
