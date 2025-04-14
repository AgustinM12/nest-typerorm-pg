import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'wagustin',
    password: 'postgres',
    database: 'my_db',
    synchronize: false,
    migrations: ['src/migrations/*.ts'],
    entities: ['src/**/*.entity.ts'],
});
