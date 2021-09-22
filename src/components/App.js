import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import "../styles/App.css";
import TodoList from "./TodoList";

function App() {
    const [showTodo, setShowTodo] = useState(true);

    const handleToggleTodoList = () => {
        setShowTodo(!showTodo);
    };


    const [userId, setUserId] = useState(1); //variables con inicializador de UseState
    const [userInfo, setUserInfo] = useState(null);
    const [todos, setTodos] = useState([]);

    //llama a la base de datos en linea, y en el enlace se crea una variable que va en aumento o disminucion segun el boton
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users/${userId}'
            );
            // espera la respuesta de formato json
            const info = await response.json();
            setUserInfo(info);

            const responseTodos = await fetch(
                'https://jsonplaceholder.typicode.com/users/${userId}/todos'
            );
            const todosData = await responseTodos.json();
            setTodos(todosData);
        };

        getData();
    }, [userId]);
    const handleChangeUserId = (value) => {
        setUserId((prevState) => prevState + value);
    };

  const handleCompleted = async (position) => {
        const newTodos = [...todos];
        newTodos[position].completed = true;
        setTodos(newTodos);
    };

    const handleDelete = (position) => {
        const newTodos = todos.filter((todo, index) => index !== position);
        setTodos(newTodos);
    };

    if (!userInfo) {
        return "Espere...";
    }

    return (
        <>
            <UserInfo user={userInfo} />
            {showTodo && <TodoList />}
        </>
    );
}

export default App;