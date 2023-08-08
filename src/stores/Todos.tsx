import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
    children: ReactNode 
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createAt: Date;
}

export type TodosContext = {
    todos:  Todo[];
    handelAddTodo: (task: string) => void; // call signature
    toggleTodoAsCompleted: (id: string) => void;
    handelDeleteTodo: (id: string) => void;
}

export const todoContext = createContext<TodosContext | null>(null);

export const TodoProvider = ({children}:TodosProviderProps) => {

    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[];
        } catch (error) {
            return [];
        }
    });

    const handelAddTodo = (task:string) => {
        setTodos((prev) => {
            const newTodos:Todo[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createAt: new Date()
                },
                ...prev
            ]
            // console.log("my previous data", ...prev);
            // console.log(newTodo);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    // mark completed
    const toggleTodoAsCompleted = (id: string) => {
        setTodos((prev) => {
            const newTodos = prev.map((todo) => {
                if(todo.id === id) {
                    return {...todo, completed: !todo.completed}
                }
                return todo;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    } 

    // delete the indivisual data 
    const handelDeleteTodo = (id: string) => {
        setTodos((prev) => {
            const newTodos = prev.filter((filterTodo) => filterTodo.id !== id);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    } 

    return(
        <todoContext.Provider value={{todos, handelAddTodo, toggleTodoAsCompleted, handelDeleteTodo}}>
            {children}
        </todoContext.Provider>
    )
}

// consumer
export const useTodos = () => {
    const todosConsumer = useContext(todoContext);

    if(!todosConsumer) {
        throw new Error("useTodos used outside of Provider");
    }

    return todosConsumer;
}