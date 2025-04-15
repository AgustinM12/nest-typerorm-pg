import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "wagustin",
      password: "postgres",
      database: "my_db",
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    TaskModule,
    FilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
