import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: 'bc_db',
    password: 'bc_db123',
    database: 'billingconfig_db',
    entities: [__dirname + "./../../modules/**/entities/*.entity{.ts,.js}"],

    // We are using migrations, synchronize should be set to false.
    synchronize: false,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: true,
    logging: true,
    logger: "file",
    timezone: "+0",

    // Allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev.
    migrations: [__dirname + "./../../migrations/**/*{.ts,.js}"],

    // cli: {
    //   // Location of migration should be inside src folder
    //   // to be compiled into dist/ folder.
    //   migrationsDir: "./../../migrations",
    // },
}

export const datasource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: 'bc_db',
    password: 'bc_db123',
    database: 'billingconfig_db',
    entities: [__dirname + "./../../modules/**/entities/*.entity{.ts,.js}"],

    // We are using migrations, synchronize should be set to false.
    synchronize: false,


    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: true,
    logging: true,
    timezone: "+0",

    // Allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev.
    migrations: ["src/migrations/**/*{.ts,.js}"],

    // cli: {
    //     // Location of migration should be inside src folder
    //     // to be compiled into dist/ folder.
    //     migrationsDir: "./../../migrations",
    // },

});