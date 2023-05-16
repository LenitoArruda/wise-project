import { useLocation } from "react-router-dom";

import styles from "./Projects.module.css";
import ProjectCard from "../project/ProjectCard";
import Message from "../layouts/Message";
import Container from "../layouts/Container";
import Loading from "../layouts/Loading";
import LinkButton from "../layouts/LinkButton";
import { useState, useEffect } from "react";
import axios from "../../axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectMessage, setProjectMessage] = useState("");
  const [removeLoading, setRemoveLoading] = useState(false);
  const location = useLocation();
  const headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  let message = "";
  if (location.state) {
    message = location.state.message;
  }
  useEffect(() => {
    axios
      .get("http://localhost:3333/projects", {
        mode: "no-cors",
        headers: headers,
      })
      .then((resp) => {
        setProjects(resp.data);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err));
  });

  function removeProject(id) {
    setProjectMessage("");
    axios
      .delete(`http://localhost:3333/projects/${id}`, {
        mode: "no-cors",
        headers: headers,
      })
      .then((resp) => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage("The project was removed!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>My Projects</h1>
        <LinkButton to="/newproject" text="Create Project" />
      </div>
      <div className={styles.message}>
        {projectMessage && <Message msg={projectMessage} type="success" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              name={project.name}
              id={project._id}
              budget={project.budget}
              category={project.category.name}
              key={project._id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
