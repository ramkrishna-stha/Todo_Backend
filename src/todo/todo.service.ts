import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>, /* repository works with the entities object like insert, update ,delete */
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepo.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepo.findOne({ where: { id } });
  }

  create(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = this.todoRepo.create(todo);
    return this.todoRepo.save(newTodo);
  }

  async update(id: number, todo: Partial<Todo>): Promise<Todo> {
    await this.todoRepo.update(id, todo);
    return this.findOne(id);
  }

 
  delete(id: number): Promise<void> {
    return this.todoRepo.delete(id).then(() => undefined);
  }
  


}
