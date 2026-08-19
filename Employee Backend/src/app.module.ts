// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: '10.237.19.26',
      port: 1433,
      username: 'crmuser',
      password: 'Crm@2060$',
      database: 'POC',
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        options: {
          encrypt: false,
          trustServerCertificate: true
        }
      }
    }),
    EmployeeModule,
    AuthModule,
    UserModule,
  ],
})

export class AppModule {}