import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./user.model").User[]>;
    create(body: any): Promise<import("./user.model").User>;
    update(id: number, body: any): Promise<import("./user.model").User | null>;
    delete(id: number): Promise<number>;
    toggle(id: number): Promise<import("./user.model").User | {
        message: string;
    }>;
}
