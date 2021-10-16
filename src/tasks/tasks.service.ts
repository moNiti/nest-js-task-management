import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   console.log(task.id);
  //   return task;
  // }
  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    console.log(task);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }
  // deleteTaskById(id: string): Task[] {
  //   const updateTask = this.tasks.filter((task) => task.id != id);
  //   if (updateTask.length === this.tasks.length) {
  //     throw new NotFoundException(`Task with id ${id} not found`);
  //   }
  //   this.tasks = updateTask;
  //   return this.tasks;
  // }
  // updateTaskStatusById(
  //   id: string,
  //   updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   let updatedTask: Task;
  //   let isUpdated = false;
  //   const { status } = updateTaskStatusDto;
  //   const newsTasks = this.tasks.map((task) => {
  //     if (task.id === id) {
  //       updatedTask = { ...task, status: status };
  //       isUpdated = true;
  //       return updatedTask;
  //     } else {
  //       return task;
  //     }
  //   });
  //   if (!isUpdated) {
  //     throw new NotFoundException(`Task with id ${id} not found`);
  //   }
  //   this.tasks = newsTasks;
  //   return updatedTask;
  // }
  // getTasksWithFilters(filtersDto: GetTasksFilterDto): Task[] {
  //   const { search, status } = filtersDto;
  //   return this.tasks.filter((task) => {
  //     let checkFilter = false;
  //     if (status) {
  //       checkFilter = task.status === status;
  //     }
  //     if (search) {
  //       checkFilter =
  //         task.title.includes(search) || task.description.includes(search);
  //     }
  //     return checkFilter;
  //   });
  // }
}
