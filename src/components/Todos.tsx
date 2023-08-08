import { Todo, useTodos } from "../stores/Todos";
import { useSearchParams } from "react-router-dom";

const Todos = () => {
    const {todos, toggleTodoAsCompleted, handelDeleteTodo} = useTodos();

    const [searchParams] = useSearchParams();
    const todosData = searchParams.get("todos");

    let filterData = todos;

    if(todosData === "active") {
        filterData = filterData.filter((task) => !task.completed); 
    }

    if(todosData === "completed") {
        filterData = filterData.filter((task) => task.completed); 
    }

    return (
        <ul className="main-task">
            {
                filterData.map((todo: Todo) => {
                    return <li key={todo.id}>
                        <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => toggleTodoAsCompleted(todo.id)} />
                        <label htmlFor={`todo-${todo.id}`}> {todo.task} </label>

                        {
                            todo.completed && (
                                <button type="submit" onClick={() => {handelDeleteTodo(todo.id)}}>Delete</button>
                            )
                        }
                    </li>
                })
            }
        </ul>
    )
}

export default Todos;