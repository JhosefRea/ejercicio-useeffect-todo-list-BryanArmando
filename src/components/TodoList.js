import { useEffect, useRef, useState } from "react";
import "../styles/TodoList.css";
import {Button} from "antd";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const inputRef = useRef(null);
    const [task, setTask] = useState(null);

    useEffect(() => {
        console.log("useEffect TodoList (en cada renderizado)");
    }); // se ejecuta en cada renderizado del componente

    useEffect(() => {
        console.log("useEffect TodoList (solo cuando se monta)");
    }, []); // si la lista de dependencias es vacía ([]) se ejecuta solo cuando se monta el componente

    useEffect(() => {
        console.log("useEffect TodoList (completed)");
    }, [completed]); // se ejecuta solo cuando se actualiza la variable de estado "completed"

    useEffect(() => {
        console.log("useEffect TodoList (completed, todo)");
        if (todos.length > 0) {
            document.title = `Tienes ${todos.length} tareas pendientes`;
        } else {
            document.title = "No tienes tareas pendientes";
        }
    }, [todos]); // se ejecuta solo cuando se actualiza la variable de estado "completed" y "todos"


    useEffect(() => {
        console.log("SE MONTO EL COMPONENTE");
        window.addEventListener("resize", handleResize);

        return () => {
            console.log("SE DESMONTO EL COMPONENTE");
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        console.log("handleResize", window.innerWidth);
        setWindowWidth(window.innerWidth);
    };

    const handleAddTask = () => {
        // const newTodo = document.querySelector("#todo").value;
        // setTodos((prevState) => [...prevState, newTodo]);
        // document.querySelector("#todo").value = "";

        console.log("inputRef.current", inputRef.current);
        const newTodo = inputRef.current.value;
        setTodos((prevState) => [...prevState, newTodo]);
        inputRef.current.value = "";
    };

    const handleDeleteTask = (positionToDelete) => {
        const newTodos = todos.filter(
            (todo, taskPosition) => taskPosition !== positionToDelete
        );
        setTodos(newTodos);
    };

    const handleCompleteTask = (positionToComplete) => {
        const taskToComplete = todos[positionToComplete];
        handleDeleteTask(positionToComplete);
        setCompleted((prevState) => [...prevState, taskToComplete]);
    };


    useEffect(() => {
        const getData = async () =>{
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users/1/todos"
            );
            const data = await response.json();
            setTask(data);

        };

        getData();
    }, []);

    if (!task) {
        return "Cargando datos...";
    }

    return (

        <div className="recip">
            <div>
                <label htmlFor="todo">Tarea</label>
                <input type="text" id="todo" ref={inputRef} />
                <button onClick={handleAddTask}>Agregar tarea</button>
            </div>

            <h1>Lista de tareas </h1>
            <div>

                <table>
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {todos.map((todo, index) => (
                        <tr key={index}>

                            <td>{todo}</td>
                            <td>
                                <Button onClick={() => handleCompleteTask(index)}>
                                    Marcar como completada
                                </Button>
                            </td>

                            <td>
                                <Button onClick={() => handleDeleteTask(index)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {task.map((task, index)=>(
                        <tr key={task.id}>
                            <td> {task.title} </td>
                            {task.completed}
                            <input type="checkbox" checked={task.completed}/>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default TodoList;