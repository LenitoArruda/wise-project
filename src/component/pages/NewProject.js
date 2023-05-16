import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { useState } from "react";
import styles from "./NewProject.module.css";
import Message from "../layouts/Message";
import ProjectForm from "../project/ProjectForm";

function NewProject() {
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [type, setType] = useState([]);
  
  function createPost(project) {
    setMessage("");
    setType("");
    if (!project.name || !project.budget || project.category.name === 'Select an option') {
      setMessage("Fill in all fields");
      setType("error");
      return false;
    }
    // initialize cost and services
    project.cost = 0;
    project.services = [];

    axios
      .post("http://localhost:3333/projects", project)
      .then((data) => {
        navigate("/projects", { state: { message: "Project created" } });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={styles.newproject_container}>
      <div className={styles.message}>
        {message && <Message msg={message} type={type} />}
      </div>
      <div className={styles.form_container}>
        <h1>Create Project</h1>
        <p>Create your project to add services</p>
        <ProjectForm handleSubmit={createPost} btnText="Create Project" />
      </div>
    </div>
  );
}

export default NewProject;
