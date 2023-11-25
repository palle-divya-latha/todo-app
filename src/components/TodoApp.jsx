
// TodoApp.js

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, ListGroup, Button, Modal } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';
import './styles.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [deleteTask, setDeleteTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAllTasksModal, setShowAllTasksModal] = useState(false);
  const [showCompletedTasksModal, setShowCompletedTasksModal] = useState(false);
  const [showUncompletedTasksModal, setShowUncompletedTasksModal] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: Math.min(...todos.map((todo) => todo.id), todos.length) - 1,
        title: newTask,
        completed: false,
      };
      setTodos([newTodo, ...todos]);
      setNewTask('');
    }
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTask = (id, newTitle) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleDeleteTask = (id) => {
    setDeleteTask(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deleteTask));
    setDeleteTask(null);
    setShowDeleteModal(false);
  };

  const closeModal = () => {
    setDeleteTask(null);
    setShowDeleteModal(false);
    setShowAllTasksModal(false);
    setShowCompletedTasksModal(false);
    setShowUncompletedTasksModal(false);
  };

  const handleSeeMore = (modalType) => {
    if (modalType === 'all') setShowAllTasksModal(true);
    else if (modalType === 'completed') setShowCompletedTasksModal(true);
    else if (modalType === 'uncompleted') setShowUncompletedTasksModal(true);
  };

  return (
    <div   style={{marginTop: '50px',
      backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/gradient2.webp')",
      backgroundSize: 'cover', // Optional: Set the background size to cover the entire container
      backgroundRepeat: 'no-repeat' ,
      height: "auto"
    }}>
      <Container className="mt-4">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
          <div className="filter-buttons mt-3 " >
  <Button variant="light" onClick={() => handleSeeMore('all')} style={{marginRight: "2px", backgroundColor: '#efdfe9', color: '#9c23bc', borderColor: "#9c23bc", borderRadius: "30px",}}>
    Show All
  </Button>
  <Button variant="light" onClick={() => handleSeeMore('completed')} style={{marginRight: "2px",backgroundColor: '#efdfe9', color: '#9c23bc', borderColor: "#9c23bc", borderRadius: "30px",}}>
    Show Completed
  </Button>
  <Button variant="light" onClick={() => handleSeeMore('uncompleted')} style={{backgroundColor: '#efdfe9', color: '#9c23bc', borderColor: "#9c23bc", borderRadius: "30px",}}>
    Show Uncompleted
  </Button>
</div>

            <Form >
              <Form.Group controlId="newTask">
                <Form.Control
                  type="text"
                  placeholder="Add a new task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  style={{ backgroundColor: '#f0cde3', border: "none", color: "#9c23bc" }} 
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleAddTask}
                style={{ backgroundColor: '#9c23bc', color: 'white', border: "none", borderRadius: "30px", paddingRight: "15px",paddingLeft: "15px", margin: "5px" }}
              >
                Add Task
              </Button>
            </Form>
            <ListGroup className="mt-3">
              {todos
                .slice(0, 7)
                .map((todo) => (
                  <ListGroup.Item
                    key={todo.id}
                    className="list-item"
                    style={{
                      backgroundColor: todo.completed ? '#d4edda' : '#fff',
                      borderColor: todo.completed ? '#c3e6cb' : '#ced4da',
                    }}
                  >
                    <span
                      style={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? '#6c757d' : '#212529',
                        color: "#9c23bc"
                      }}
                      onClick={() => handleToggleComplete(todo.id)}
                    >
                      {todo.title}
                    </span>
                    <div className="edit-delete-buttons">
                      <Button
                        variant="link"
                        onClick={() =>
                          handleEditTask(
                            todo.id,
                            prompt('Edit task:', todo.title)
                          )
                        }
                        style={{ color: '#007bff' }}
                      >
                        <BsPencil />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDeleteTask(todo.id)}
                        style={{ color: '#dc3545' }}
                      >
                        <BsTrash />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              {todos.length > 7 && (
                <ListGroup.Item className="list-item" style={{margin: "1%", backgroundColor: '#efdfe9', color: '#9c23bc', borderColor: "#9c23bc", borderRadius: "30px",}}>
                  <Button variant="link"  onClick={() => handleSeeMore('all')} style={{textDecoration: "none", color: "#9c23bc"}}>
                    See More
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
         

          </Col>
        </Row>

        <Modal show={showDeleteModal} onHide={closeModal} style={{color: "#9c23bc"}}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete the task?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDeleteTask}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showAllTasksModal} onHide={closeModal} size="lg" style={{color: "#9c23bc"}}>
          <Modal.Header closeButton>
            <Modal.Title>All Tasks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {todos
                .sort((a, b) => a.id - b.id)
                .map((todo) => (
                  <ListGroup.Item
                    key={todo.id}
                    className="list-item"
                    style={{
                      backgroundColor: todo.completed ? '#d4edda' : '#fff',
                      borderColor: todo.completed ? '#c3e6cb' : '#ced4da',
                      color: "#9c23bc"
                    }}
                  >
                    <span
                      style={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? '#6c757d' : '#212529',
                        color: "#9c23bc"
                      }}
                      onClick={() => handleToggleComplete(todo.id)}
                     
                    >
                      {todo.title}
                    </span>
                    <div className="edit-delete-buttons">
                      <Button
                        variant="link"
                        onClick={() =>
                          handleEditTask(
                            todo.id,
                            prompt('Edit task:', todo.title)
                          )
                        }
                        style={{ color: '#007bff' }}
                      >
                        <BsPencil />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDeleteTask(todo.id)}
                        style={{ color: '#dc3545' }}
                      >
                        <BsTrash />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Modal.Body>
        </Modal>

        <Modal show={showCompletedTasksModal} onHide={closeModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Completed Tasks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {todos
                .filter((todo) => todo.completed)
                .sort((a, b) => a.id - b.id)
                .map((todo) => (
                  <ListGroup.Item
                    key={todo.id}
                    className="list-item"
                    style={{
                      backgroundColor: '#d4edda',
                      borderColor: '#c3e6cb',
                    }}
                  >
                    <span
                      style={{
                        textDecoration: 'line-through',
                        color: '#6c757d',
                        color: "#9c23bc"
                      }}
                      onClick={() => handleToggleComplete(todo.id)}
                    >
                      {todo.title}
                    </span>
                    <div className="edit-delete-buttons">
                      <Button
                        variant="link"
                        onClick={() =>
                          handleEditTask(
                            todo.id,
                            prompt('Edit task:', todo.title)
                          )
                        }
                        style={{ color: '#007bff' }}
                      >
                        <BsPencil />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDeleteTask(todo.id)}
                        style={{ color: '#dc3545' }}
                      >
                        <BsTrash />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Modal.Body>
        </Modal>

        <Modal show={showUncompletedTasksModal} onHide={closeModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Uncompleted Tasks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {todos
                .filter((todo) => !todo.completed)
                .sort((a, b) => a.id - b.id)
                .map((todo) => (
                  <ListGroup.Item
                    key={todo.id}
                    className="list-item"
                    style={{
                      backgroundColor: '#fff',
                      borderColor: '#ced4da',
                      
                    }}
                  >
                    <span
                      style={{
                        textDecoration: 'none',
                        color: '#212529',
                        color: "#9c23bc"
                      }}
                      onClick={() => handleToggleComplete(todo.id)}
                    >
                      {todo.title}
                    </span>
                    <div className="edit-delete-buttons">
                      <Button
                        variant="link"
                        onClick={() =>
                          handleEditTask(
                            todo.id,
                            prompt('Edit task:', todo.title)
                          )
                        }
                        style={{ color: '#007bff' }}
                      >
                        <BsPencil />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDeleteTask(todo.id)}
                        style={{ color: '#dc3545' }}
                      >
                        <BsTrash />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default TodoApp;
