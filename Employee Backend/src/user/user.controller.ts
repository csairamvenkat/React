import {
 Controller,
 Get,
 Post,
 Put,
 Delete,
 Patch,
 Param,
 Body
} from '@nestjs/common';

import { UserService } from './user.service';
import {
 UseGuards
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { Roles } from '../auth/roles.decorator';

import { RolesGuard } from '../auth/roles.guard';

@UseGuards( JwtAuthGuard, RolesGuard)
@Roles('admin')

@Controller('user')
export class UserController {

 constructor(
   private userService: UserService
 ) {}

 @Get()
 findAll() {
   return this.userService.findAll();
 }

 @Post()
 create(
   @Body() body: any
 ) {
   return this.userService.create(body);
 }

 @Put(':id')
 update(
   @Param('id') id: number,
   @Body() body: any
 ) {
   return this.userService.update(
     +id,
     body
   );
 }

 @Delete(':id')
 delete(
   @Param('id') id: number
 ) {
   return this.userService.delete(+id);
 }

 @Patch(':id/toggle')
 toggle(
   @Param('id') id: number
 ) {
   return this.userService.toggle(+id);
 }
}