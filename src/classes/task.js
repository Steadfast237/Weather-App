class Task {
  title = undefined;
  dueDate = undefined;

  constructor(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate;
  }

  get title() {
    return this.title;
  }

  set title(newTitle) {
    this.title = newTitle;
  }

  get dueDate() {
    return this.dueDate;
  }

  set dueDate(newDueDate) {
    this.dueDate = newDueDate;
  }
}

export default Task;
