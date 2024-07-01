import { format } from 'date-fns';
import Task from '../classes/task';
import { saveData, toggleForm } from '../assets';

class TaskController {
  #activeProject = undefined;
  #projectName = document.querySelector('.content h2');
  #taskList = document.querySelector('.task-list');
  #form = document.querySelector('.content form');
  #formContainer = document.querySelector('.content .form-container');

  constructor(project) {
    this.#activeProject = project;

    this.updateProjectName(this.#activeProject);
    this.updateProjectTaskList(this.#activeProject);

    this.#form.addEventListener('submit', this.addTaskToProject);
    this.#formContainer.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON' || e.target.type !== 'button') return;
      toggleForm(
        document.querySelector('.content .form-container > button'),
        this.#form.elements[0],
        this.#form
      );
      this.#form.elements[0].value = '';
    });

    this.#taskList.addEventListener('click', (e) => {
      this.deleteTaskFromList(e);
      this.changeTask(e);
    });
  }

  updateActiveProject = (project) => {
    if (!project) {
      this.#projectName.textContent = '';
      this.#taskList.innerHTML = '';
      document
        .querySelector('.content .form-container > button')
        .classList.add('hidden');
      return;
    }

    this.#activeProject = project;
    this.updateProjectName(this.#activeProject);
    this.updateProjectTaskList(this.#activeProject);
  };

  updateProjectName = (project) => {
    this.#projectName.textContent = '';
    this.#projectName.textContent = project.name;
  };

  updateProjectTaskList = (project) => {
    let markup = '';

    project.taskList.forEach((task, index) => {
      markup += `
        <li>
          <button data-index=${index}>
            <input
              type="text"
              name="${task.title}"
              id="${index}"
              value="${task.title}"
              readonly
            />

            <input type="date" value="${task.dueDate}" readonly>

            <i class="las la-trash"></i>
          </button>
        </li>`;
    });

    this.#taskList.innerHTML = markup;
  };

  addTaskToProject = (e) => {
    e.preventDefault();

    this.#activeProject.addTask(
      new Task(e.target.elements[0].value, format(Date.now(), 'yyyy-MM-dd'))
    );

    this.updateProjectTaskList(this.#activeProject);

    e.target.elements[0].value = '';
    toggleForm(
      document.querySelector('.content .form-container > button'),
      this.#form.elements[0],
      this.#form
    );
    saveData();
  };

  deleteTaskFromList = (e) => {
    if (e.target.tagName !== 'I') return;

    if (!e.target.classList.contains('la-trash')) return;

    this.#activeProject.deleteTask(
      Number(e.target.parentElement.dataset.index)
    );

    this.updateProjectTaskList(this.#activeProject);
    saveData();
  };

  changeTask = (e) => {
    if (e.target.tagName !== 'INPUT') return;

    const input = e.target;
    input.removeAttribute('readonly');

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (input.type === 'text') {
          this.#activeProject.updateTask(
            Number(input.id),
            'title',
            input.value
          );
        }

        if (input.type === 'date') {
          this.#activeProject.updateTask(
            Number(input.id),
            'dueDate',
            input.value
          );
        }

        input.setAttribute('readonly', 'readonly');
        saveData();
      }
    });
  };
}

export default TaskController;
