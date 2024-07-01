import Project from './project';

class Todo {
  #projectList = [
    new Project('inbox'),
    new Project('today'),
    new Project('week'),
  ];

  #activeProject = undefined;

  constructor() {
    this.#activeProject = this.#projectList[0];
  }

  get activeProject() {
    return this.#activeProject;
  }

  set activeProject(projectId) {
    this.#activeProject = this.#projectList[projectId];
  }

  get projectList() {
    return this.#projectList;
  }

  addProject = (project) => {
    this.#projectList.push(project);
  };

  getProject = (projectId) => {
    return this.#projectList[projectId];
  };

  updateProject = (projectId, property, value) => {
    this.#projectList[projectId][property] = value;
  };

  deleteProject = (projectId) => {
    this.#projectList = this.#projectList.filter(
      (_, index) => index !== projectId
    );
  };
}

export default new Todo();
