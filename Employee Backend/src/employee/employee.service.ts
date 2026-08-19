// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class EmployeeService {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {

  constructor(
    @InjectModel(Employee)
    private employeeModel: typeof Employee
  ) {}

  create(data:any){
    return this.employeeModel.create(data);
  }

  findAll(){
    return this.employeeModel.findAll();
  }

  findOne(id:number){
    return this.employeeModel.findByPk(id);
  }

  update(id:number,data:any){
    return this.employeeModel.update(data,{where:{id}});
  }

  delete(id:number){
    return this.employeeModel.destroy({where:{id}});
  }
}