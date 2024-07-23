import TodoList from "./components/TodoList.jsx"
import TodoInput from "./components/TodoInput.jsx"
import { useState ,useEffect } from "react"
function App() { 

    const [todos, setTodos] = useState([]);
    const [todoValue, setTodoValue] = useState('');


  function presistData(newList){
    localStorage.setItem('todos' ,JSON.stringify({todos:newList}));
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos , newTodo]
    presistData(newTodoList)
    setTodos(newTodoList)

  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    presistData(newTodoList)
    setTodos(newTodoList)

  }
  function handleEditTodo(index){
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);

  }

  useEffect(() => {
    if(!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos');
    if(!localTodos){
      return
    } 
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  } , [])

  

  return (
    <>
      <TodoInput handleAddTodos={handleAddTodos}  todoValue = {todoValue} setTodoValue ={setTodoValue}/>
      <TodoList  handleDeleteTodo={handleDeleteTodo} todos = {todos} handleEditTodo = {handleEditTodo}/>
    </>
  )
}

export default App
 