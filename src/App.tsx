import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main>
      <div className="container">
        <h2>Todo App With React & TyepScript</h2>
        <Navbar/>
        <AddTodo/>
        <Todos/>  
      </div>
    </main>
  )
}

export default App;