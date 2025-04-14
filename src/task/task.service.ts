import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    // ! FORMA MANUAL 
    // const newTask = new Task()
    // newTask.name = createTaskDto.name;
    // return this.taskRepo.save(newTask)

    const newTask = this.taskRepo.create(createTaskDto)
    return await this.taskRepo.save(newTask)
  }

  async findAll() {
    const tasks = await this.taskRepo.find();

    return tasks;
  }

  async findOne(id: number) {
    const tasks = await this.taskRepo.findOne({ where: { id } });

    return tasks;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepo.findOne({ where: { id } })
    this.taskRepo.merge(task, updateTaskDto);
    return this.taskRepo.save(task)
  }

  async remove(id: number) {
    await this.taskRepo.delete(id)
  }
}
