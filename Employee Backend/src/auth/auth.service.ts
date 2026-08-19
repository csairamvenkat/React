import { Injectable }
from '@nestjs/common';

import { JwtService }
from '@nestjs/jwt';

import { InjectModel }
from '@nestjs/sequelize';

import { User }
from '../user/user.model';

@Injectable()
export class AuthService {

 constructor(
   private jwtService: JwtService,

   @InjectModel(User)
   private userModel: typeof User
 ) {}

 async login(
 username: string,
 password: string
) {

 console.log("INPUT:", username);

 const user =
   await this.userModel.findOne({
     where: {
       username: username.trim()
     }
   });

 console.log("FOUND USER:", user);

 if (!user) return null;

 console.log("DB PASS:", user.password);
 console.log("ACTIVE:", user.isActive);

 if (
   user.password.trim() !==
   password.trim()
 ) {
   console.log("PASSWORD FAIL");
   return null;
 }

 const payload = {
   username: user.username,
   role: user.role
 };

 return {
   access_token:
     this.jwtService.sign(payload)
 };
}
}