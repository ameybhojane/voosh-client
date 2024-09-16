// App.js
import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Col, Container, Row } from "reactstrap";
import AddTask from "./AddTask";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import axios from "axios";
import config from './../config/config';
import TaskCard from "./TaskCard";
import ToDoCard from "./ToDoCard";

const ItemTypes = {
  ITEM: "ITEM",
};

// Draggable item component
const DraggableItem = ({ item, index, moveItem, column }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { index, column }, // Pass both index and column
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: "lightblue",
        padding: "8px",
        marginBottom: "4px",
        cursor: "move",
      }}
    >
     <ToDoCard {...item}/>
    </div>
  );
};

// Droppable column component
const DroppableColumn = ({ items, moveItem, columnName, column }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (draggedItem) => moveItem(draggedItem, column), // Pass the target column
  });

  return (
    <div
      ref={drop}
      style={{
        padding: "16px",
        backgroundColor: "#f0f0f0",
        minHeight: "200px",
        width: "100%",
        border: "1px solid #ccc",
      }}
    >
      <h3>{columnName}</h3>
      {items.map((item, index) => (
        <DraggableItem
          key={index}
          item={item}
          index={index}
          moveItem={moveItem}
          column={column}
        />
      ))}
    </div>
  );
};

// Main App component
const App = () => {

  const BASE_URL = config.BASE_URL;

  const { isAuthenticated,user} = useSelector((state) => state.login);
  const navigate = useNavigate()
  useEffect(()=>{
    console.log({isAuthenticated,user})
    if(!isAuthenticated){
      navigate('/login') 
    }
  },[isAuthenticated])

  
  useEffect( ()=>{
    const {email =""} = user == null ? { } : user
    const resp = axios.get(`${BASE_URL}/tasks`,{
      params :{
        email
      }
    }).then(res=>{
      setTodoItems(res.data.todos)
      setInProgressItems(res.data.inProgress)
      setDoneItems(res.data.done)
    }).catch(e=>{
      console.log(e)
    })
  },[])

  const fetchTasks= () =>{
    const {email =""} = user == null ? { } : user
    const resp = axios.get(`${BASE_URL}/tasks`,{
      params :{
        email
      }
    }).then(res=>{
      setTodoItems(res.data.todos)
      setInProgressItems(res.data.inProgress)
      setDoneItems(res.data.done)
    }).catch(e=>{
      console.log(e)
    })
  }
  const [todoItems, setTodoItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  const moveItem = (draggedItem, targetColumn) => {
    const { index, column: sourceColumn } = draggedItem;
    let sourceItems, setSourceItems, targetItems, setTargetItems;

    // Determine the source and target columns based on the item being dragged
    if (sourceColumn === "todo") {
      sourceItems = todoItems;
      setSourceItems = setTodoItems;
    } else if (sourceColumn === "inprogress") {
      sourceItems = inProgressItems;
      setSourceItems = setInProgressItems;
    } else {
      sourceItems = doneItems;
      setSourceItems = setDoneItems;
    }

    if (targetColumn === "todo") {
      targetItems = todoItems;
      setTargetItems = setTodoItems;
    } else if (targetColumn === "inprogress") {
      targetItems = inProgressItems;
      setTargetItems = setInProgressItems;
    } else {
      targetItems = doneItems;
      setTargetItems = setDoneItems;
    }

    // Remove the item from the source column and add it to the target column
    const [movedItem] = sourceItems.splice(index, 1);
    setSourceItems([...sourceItems]);
    setTargetItems([...targetItems, movedItem]);
    updateStatus(movedItem,targetColumn)
  };

  const updateStatus = async(task, targetColumn) =>{
    console.log({task})
    task = JSON.parse(JSON.stringify(task))
    task.status = targetColumn
    console.log(targetColumn)
    console.log({task})
    const resp = await axios
    .post(`${BASE_URL}/tasks/update`, task)
    .then((res) => {
      console.log("Task Updated Successfully");
    })
    .catch((e) => console.log(e));
  }

  return (
    <>
    <AddTask fetchTasks={fetchTasks}/>
    <DndProvider backend={HTML5Backend}>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
          }}
          > */}
      <Container className="d-flex flex-column min-vh-100" >
        <Row style={{height:"100vh"}}>
        <Col xs="12" md="4">
          <DroppableColumn
            items={todoItems}
            moveItem={moveItem}
            columnName="To Do"
            column="todo"
            />
        </Col>
        <Col xs="12" md="4">
          <DroppableColumn
            items={inProgressItems}
            moveItem={moveItem}
            columnName="In Progress"
            column="inprogress"
            />
        </Col>
        <Col xs="12" md="4" >
          <DroppableColumn
            items={doneItems}
            moveItem={moveItem}
            columnName="Done"
            column="done"
            />
        </Col>
            
                    </Row>
                  </Container>
      {/* </div> */}
    </DndProvider>
            </>
  );
};

export default App;
