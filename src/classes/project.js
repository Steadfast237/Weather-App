class Project {
  name = undefined;
  taskList = [];

  constructor(name) {
    this.name = name;
  }

  get name() {
    return this.name;
  }

  set name(newName) {
    this.name = newName;
  }

  get taskList() {
    return this.taskList;
  }

  addTask = (task) => {
    this.taskList.push(task);
  };

  getTask = (taskId) => {
    return this.taskList[taskId];
  };

  updateTask = (taskId, property, value) => {
    this.taskList[taskId][property] = value;
  };

  deleteTask(taskId) {
    this.taskList = this.taskList.filter((_, index) => index !== taskId);
  }
}

export default Project;
