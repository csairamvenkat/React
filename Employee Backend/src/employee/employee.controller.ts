import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('employee')
export class EmployeeController {

 constructor(private service:EmployeeService){}

 @Roles('admin', 'manager')
 @Post()
 create(@Body() body:any){
   return this.service.create(body);
 }

 @Get()
 getAll(){
   return this.service.findAll();
 }

 @Get(':id')
 getOne(@Param('id') id:number){
   return this.service.findOne(id);
 }

 @Roles('admin', 'manager')
 @Put(':id')
 update(@Param('id') id:number,@Body() body:any){
   return this.service.update(id,body);
 }

 @Roles('admin')
 @Delete(':id')
 delete(@Param('id') id:number){
   return this.service.delete(id);
 }
}