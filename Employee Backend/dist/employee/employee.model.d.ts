import { Model } from 'sequelize-typescript';
export declare class Employee extends Model<Employee> {
    name: string;
    email: string;
    department: string;
    salary: number;
    joiningDate: Date;
    designation: string;
}
