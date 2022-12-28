import React, { useState } from "react";
import { Container, Form, Button, Alert,Row,Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FaPlus,FaTrash } from "react-icons/fa";


const TodoList = () => {
  const refreshState = JSON.parse(localStorage.getItem("todos")) ?? []; // if null [] else todos
  const [todoList, setTodoList] = useState([...refreshState]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if(text.trim() == ""){
      alert("Can't add empty todo");
      return;
    }

   const newTodo = [
      ...todoList,
      {
        data: text,
        date: new Date().toLocaleString().split(",")[0],
        isCompleted: false,
      },
    ];
    setText("");
    setTodoList(newTodo);
    localStorage.setItem('todos',JSON.stringify(newTodo));
     
  };

  const taskComplete = (id) => {
    const newTodo = todoList.map((todo,index) =>
      index === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodoList(newTodo);
    localStorage.setItem("todos",JSON.stringify(newTodo));
  };


  const  deleteTodo = (id) =>{

   const newTodo =  todoList.filter(( _,index) =>
      (index === id)? false : true
    ); 

    setTodoList(newTodo);
    localStorage("todos", JSON.stringify(newTodo));
  }

  return (
    <Container className="mt-3 text-center">
      <h3>Todo App</h3>
      <Form.Control
        className=".bg-light"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp ={(e) =>(e.key=== 'Enter' ? addTodo(): null)}
      />

      <br />
      <Button className="bg-info text-white" onClick={addTodo}>
        <FaPlus />
        <label className="ms-2">Add</label>
      </Button>

      <br />
      <br />

      {todoList.length > 0
        ? todoList.map((todoData, index) => {
            return (
              <Row>
                <Col xs="10">
                  <Alert
                    className="text-start"
                    variant={todoData.isCompleted ? "danger" : "primary"}
                    style={{
                      color: "",
                      cursor: "pointer",
                      textDecoration: todoData.isCompleted
                        ? "line-through"
                        : "none",
                    }}
                    onClick={() => taskComplete(index)}
                  >
                    {todoData.data}
                    <br />
                    <small>{todoData.date}</small>
                  </Alert>
                </Col>

                <Col className="mt-4">
                 <FaTrash size="30" color="tomato" style={{cursor:"pointer"}} onClick = {() =>{deleteTodo(index)}}/>
                </Col>
                 
              </Row>
            );
          })
        : "No Todo"}
    </Container>
  );
};
export default TodoList;
