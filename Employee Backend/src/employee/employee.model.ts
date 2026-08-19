import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'employees'
})
export class Employee extends Model<Employee> {

  @Column({
    type: DataType.STRING
  })
  name!: string;

  @Column({
    type: DataType.STRING
  })
  email!: string;

  @Column({
    type: DataType.STRING
  })
  department!: string;

  @Column({
    type: DataType.INTEGER
  })
  salary!: number;

  @Column(DataType.DATE)
  declare joiningDate: Date;

  @Column(DataType.STRING)
  declare designation: string;
}