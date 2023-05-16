import { v4 as uuidv4 } from "uuid";

import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ServiceCard from "../service/ServiceCard";
import Container from "../layouts/Container";
import Loading from "../layouts/Loading";
import Message from "../layouts/Message";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import axios from "../../axios";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState([]);
  const [type, setType] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3333/projects/${id}`, {
        mode: "no-cors",
        headers: headers,
      })
      .then((resp) => {
        setProject(resp.data);
        setServices(resp.data.services);
      })
      .catch((err) => console.log(err));
  }, []);

  
  function editProject(project) {
    setMessage("");

    //budget validation
    if (project.budget < project.cost) {
      setMessage(`Cost can't be higher than budget!`);
      setType("error");
      return false;
    }

    axios
      .put(`http://localhost:3333/projects/${project._id}`, project)
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Project updated!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  //Create a service in the project
  function createService(project) {
    setMessage("");

    // last service
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    // maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage(
        "Service cost is higher than the budget remaining. Check service cost"
      );
      setType("error");
      project.services.pop();
      return false;
    }

    // add service cost to project total cost
    project.cost = newCost;

    // update prpoject
    axios
      .put(`http://localhost:3333/projects/${project._id}`, project)
      .then((resp) => {
        setShowServiceForm(false);
        setMessage("Service created");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  //Remove service from project
  function removeService(id, cost) {
    setMessage("");

    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;

    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    axios
      .put(`http://localhost:3333/projects/${project._id}`, project)
      .then((resp) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage("Service removed");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            <div className={styles.message}>
              {message && <Message msg={message} type={type}/>}
            </div>
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {showProjectForm ? "Close" : "Edit project"}
              </button>
              {showProjectForm ? (
                <div className={styles.project_info}>
                  <ProjectForm
                    btnText="Save"
                    handleSubmit={editProject}
                    projectData={project}
                  />
                </div>
              ) : (
                <div className={styles.project_info}>
                  <p>
                    <span>Category:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Budget:</span> US${project.budget}
                  </p>
                  <p>
                    <span>Spent:</span> US${project.cost}
                  </p>
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Add a service:</h2>
              <button onClick={toggleServiceForm} className={styles.btn}>
                {!showServiceForm ? "Add service" : "Close"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Add Service"
                    projectData={project}
                  />
                )}
              </div>
            </div>

            <h2>Services</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && (
                <p>This project has no services included.</p>
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
