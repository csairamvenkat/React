import { User } from './user.model';
export declare class UserService {
    private userModel;
    constructor(userModel: typeof User);
    findAll(): Promise<User[]>;
    create(data: any): Promise<User>;
    update(id: number, data: any): Promise<User | null>;
    delete(id: number): Promise<number>;
    toggle(id: number): Promise<User | {
        message: string;
    }>;
}
