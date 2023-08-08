import { FormEvent, useState } from "react";
import { useTodos } from "../stores/Todos";

const AddTodo = () => {
    const [todo, setTodo] = useState("");
    const {handelAddTodo} = useTodos();

    const handelFormSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handelAddTodo(todo);
        setTodo("");
    }

    return (
        <form onSubmit={handelFormSubmit}>
            <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Add item" autoComplete="off" />
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodo;