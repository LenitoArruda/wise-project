const ProjectModel = require("../Models/ProjectModel");

class ProjectController {

  //Adding project
  async store(req, res) {
    try {
      const { name, budget } = req.body;
      if (!name || !budget) {
        return res
          .status(400)
          .json({ message: "Name and  budget are required" });
      }
      const createProject = await ProjectModel.create(req.body);

      return res.status(200).json(createProject);
    } catch (error) {
      return res.status(400).json({ message: "Fail to create project" });
    }
  }

  //List projects
  async index(req, res) {
    try {
      const projects = await ProjectModel.find();

      if (!projects) {
        return res.status(400).json({ message: "Fail to list projects" });
      }

      return res.status(200).json(projects);
    } catch (error) {
      return res.status(400).json({ message: "Fail to list projects" });
    }
  }

  //List specific project by id
  async show(req, res) {
    try {
      const { id } = req.params;

      const project = await ProjectModel.findById(id);

      if (!project) {
        return res.status(400).json({ message: "Project does not exist" });
      }

      return res.status(200).json(project);
    } catch (error) {
      return res.status(400).json({ message: "Verify project ID" });
    }
  }

  //Update project
  async update(req, res) {
    try {
      const { id } = req.params;

      const project = await ProjectModel.findByIdAndUpdate(id, req.body);
      if (!project) {
        return res.status(400).json({ message: "Project does not exist" });
      }

      return res.status(200).json({ message: "Project updated" });
    } catch (error) {
      return res.status(400).json({ message: "Fail to update project" });
    }
  }

  //Delete project
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const projectDeleted = await ProjectModel.findByIdAndDelete(id);
      if (!projectDeleted) {
        return res.status(400).json({ message: "Project does not exist" });
      }
      return res.status(200).json({ message: "Project deleted" });
    } catch (error) {
      return res.status(400).json({ message: "Fail to delete project" });
    }
  }
}

module.exports = new ProjectController();
