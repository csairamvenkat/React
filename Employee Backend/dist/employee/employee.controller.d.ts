import { EmployeeService } from './employee.service';
export declare class EmployeeController {
    private service;
    constructor(service: EmployeeService);
    create(body: any): Promise<import("./employee.model").Employee>;
    getAll(): Promise<import("./employee.model").Employee[]>;
    getOne(id: number): Promise<import("./employee.model").Employee | null>;
    update(id: number, body: any): Promise<[affectedCount: number]>;
    delete(id: number): Promise<number>;
}
