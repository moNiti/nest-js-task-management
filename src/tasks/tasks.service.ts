import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
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
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    console.log(task);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }
  async deleteTaskById(id: string): Promise<void> {
    //  You have 2 methods to provide delete
    // Delete not check the entity exist in the database
    // Remove -> pass the object -> so you can guarantee the your entity exist
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateTaskStatusById(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<void> {
    const { status } = updateTaskStatusDto;

    const result = await this.taskRepository.update(id, { status: status });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

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
