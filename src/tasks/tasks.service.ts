import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

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
}
