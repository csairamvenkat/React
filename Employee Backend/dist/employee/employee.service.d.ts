import { Employee } from './employee.model';
export declare class EmployeeService {
    private employeeModel;
    constructor(employeeModel: typeof Employee);
    create(data: any): Promise<Employee>;
    findAll(): Promise<Employee[]>;
    findOne(id: number): Promise<Employee | null>;
    update(id: number, data: any): Promise<[affectedCount: number]>;
    delete(id: number): Promise<number>;
}
