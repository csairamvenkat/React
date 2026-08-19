import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.model';
export declare class AuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: typeof User);
    login(username: string, password: string): Promise<{
        access_token: string;
    } | null>;
}
