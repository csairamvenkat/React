import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.model';

@Module({
 imports: [
    SequelizeModule.forFeature([User]),
   JwtModule.register({
     secret: 'mysecretkey',
     signOptions: {
       expiresIn: '1h'
     }
   })
 ],
 providers: [AuthService,JwtStrategy,RolesGuard],
 controllers: [AuthController]
})
export class AuthModule {}