import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     // search
  //     return this.taskService.getTasksWithFilters(filterDto);
  //   }
  //   // get all
  //   return this.taskService.getAllTasks();
  // }

  @Get('/:id') //Path parameter
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): Task[] {
  //   return this.taskService.deleteTaskById(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatusById(
  //   @Param('id') id: string,
  //   @Body('status') updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   return this.taskService.updateTaskStatusById(id, updateTaskStatusDto);
  // }
}
