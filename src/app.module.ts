// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { User } from './entities/user.entity.ts';

// @Module({
//   imports: [
//     ConfigModule.forRoot(), 
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule], 
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>('DB_HOST', 'localhost'), 
//         port: configService.get<number>('DB_PORT', 5432),
//         username: configService.get<string>('DB_USERNAME', 'postgres'),
//         password: configService.get<string>('DB_PASSWORD', 'dolakha@12345'),
//         database: configService.get<string>('DB_NAME', 'todo_db'),
//         entities: [User],
//         synchronize: true,
//         logging:true, 
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}




import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(), /* it is manage environment variable */
    TypeOrmModule.forRoot({ /* it is manage the manage the database , interact with the entities */
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'dolakha@12345',
      database: process.env.DB_NAME || 'todo_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
      logging: true,
    }),
    TodoModule, 
  ],
})
export class AppModule {}
