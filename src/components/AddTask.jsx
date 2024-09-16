import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import config from "./../config/config";

function AddTask(args) {
  const BASE_URL = config.BASE_URL;

  const [modal, setModal] = useState(false);
  const { isAuthenticated, user = {} } = useSelector((state) => state.login);
  const toggle = () => setModal(!modal);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });

  const saveTask = async () => {
    formValues.email = user?.email;
    formValues.updatedAt = new Date();
    formValues.status = "todo";
    formValues.createdAt = new Date();
    const resp = await axios
      .post(`${BASE_URL}/tasks/add`, formValues)
      .then((res) => {
        console.log("Task Created Successfully");
        toggle();
        args.fetchTasks()
      })
      .catch((e) => console.log(e));
  };

  const handleOnChange = (e)=>{
    setFormValues({
      ...formValues,
      [e.target.name] : e.target.value
    })
  }


  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Add Task
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Add Task</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup floating>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                value={formValues.title}
                onChange={(e) => handleOnChange(e)}
              />
              <Label for="title">Title</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                id="description"
                name="description"
                placeholder="description"
                type="description"
                value={formValues.description}
                onChange={(e) => handleOnChange(e)}
              />
              <Label for="description">Description</Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveTask}>
            Add Task
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddTask;
