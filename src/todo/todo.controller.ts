import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {  /* readonly = cannot be reassigned after initialization */
  constructor(private readonly todoService: TodoService) {}  /* Dependency injection of todoservices */

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() todo: Partial<Todo>): Promise<Todo> {
    return this.todoService.create(todo);
  }


  @Patch(':id') 
  update(
    @Param('id') id: number,          
    @Body() todo: Partial<Todo>      
  ): Promise<Todo> {
    return this.todoService.update(id, todo); 
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.todoService.delete(id);
  }

}