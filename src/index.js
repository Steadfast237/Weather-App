import todo from './classes/todo';
import ProjectController from './controllers/projectController';
import { loadData } from './assets';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  new ProjectController(todo);
});
