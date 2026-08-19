// import { Module } from '@nestjs/common';
// import { EmployeeController } from './employee.controller';
// import { EmployeeService } from './employee.service';

// @Module({
//   controllers: [EmployeeController],
//   providers: [EmployeeService]
// })
// export class EmployeeModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
  imports:[SequelizeModule.forFeature([Employee])],
  providers:[EmployeeService],
  controllers:[EmployeeController]
})
export class EmployeeModule {}