import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Box, Card, CardContent, IconButton, List, ListItem, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

const Home = () => {
  const [todo, setTodo] = useState("");
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("http://localhost:3001/api/read-todos", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTodos(data.todos);
    };

    getTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/api/create-todo", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
  
        // Clear input
        setTodo("");
  
        // Refetch todos
        const updatedTodosResponse = await fetch("http://localhost:3001/api/read-todos", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const updatedTodosData = await updatedTodosResponse.json();
        setTodos(updatedTodosData.todos);
      } else {
        console.error("Error creating todo:", response.status);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };
  

  const handleEdit = async (todoId) => {
    const updatedTodo = prompt("Update your todo");
    if (updatedTodo) {
      try {
        const response = await fetch(`http://localhost:3001/api/update-todo/${todoId}`, {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todo: updatedTodo }),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
  
          // Update the todo in state
          setTodos(todos.map(t => t._id === todoId ? { ...t, todo: updatedTodo } : t));
        } else {
          console.error("Failed to update todo:", response.status);
          alert("Failed to update todo.");
        }
      } catch (error) {
        console.error("Error updating todo:", error);
        alert("An error occurred while updating the todo.");
      }
    } else {
      alert("No update provided.");
    }
  };
  
  const handleDelete = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/delete-todo/${todoId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      alert(data.message);

      // Remove the todo from state
      setTodos(todos.filter(t => t._id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Todo List
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="New Todo"
              variant="outlined"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5, fontSize: '1rem' }}
            >
              Add Todo
            </Button>
          </Box>
          <List>
            {todos.map((todo) => (
              <ListItem
                key={todo._id}
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => handleEdit(todo._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(todo._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={todo.todo} />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default Home;
