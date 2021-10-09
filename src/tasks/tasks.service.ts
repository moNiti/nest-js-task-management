import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    console.log(task.id);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id == id);
  }

  deleteTaskById(id: string): Task[] {
    const updateTask = this.tasks.filter((task) => task.id != id);
    this.tasks = updateTask;
    return this.tasks;
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    let updatedTask: Task;
    const newsTasks = this.tasks.map((task) => {
      if (task.id === id) {
        updatedTask = { ...task, status: status };
        return updatedTask;
      } else {
        return task;
      }
    });
    this.tasks = newsTasks;

    return updatedTask;
  }

  getTasksWithFilters(filtersDto: GetTasksFilterDto): Task[] {
    const { search, status } = filtersDto;
    return this.tasks.filter((task) => {
      let checkFilter = false;
      if (status) {
        checkFilter = task.status === status;
      }
      if (search) {
        checkFilter =
          task.title.includes(search) || task.description.includes(search);
      }
      return checkFilter;
    });
  }
}
