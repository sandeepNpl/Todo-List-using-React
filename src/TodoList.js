import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import "./todo.css";

const TodoList = () => {
  const refreshState = JSON.parse(localStorage.getItem("todos")) ?? [];
  const [todoList, setTodoList] = useState([...refreshState]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() == "") {
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
    console.log(newTodo);
    setText("");
    setTodoList(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  const taskComplete = (id) => {
    const newTodo = todoList.map((todo, index) =>
      index === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodoList(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  const deleteTodo = (id) => {
    const newTodo = todoList.filter((_, index) =>
      index === id ? false : true
    );

    setTodoList(newTodo);
    localStorage("todos", JSON.stringify(newTodo));
  };

  return (
    <Container className=" container ">
      <h3>Todo App</h3>
      <Form.Control
        className=".bg-light "
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => (e.key === "Enter" ? addTodo() : null)}
      />

      <br />
      <Button className="bg-info text-white" onClick={addTodo}>
        <FaPlus />
        <label className="ms-2">Add</label>
      </Button>

      <br />
      <br />

      {todoList.length > 0 ? (
        todoList.map((todoData, index) => {
          return (
            <Row className="bg-red">
              <Col xs="10">
                <Alert
                  className=" text-start"
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
                </Alert>
              </Col>
              <Col className="mt-2">
                <FaTrash
                  size="20"
                  color="blue"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    deleteTodo(index);
                  }}
                />
              </Col>
            </Row>
          );
        })
      ) : (
        <p
          style={{
            color: "#272822",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          No Todos
        </p>
      )}
    </Container>
  );
};
export default TodoList;
