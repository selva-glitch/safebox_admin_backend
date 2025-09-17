import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { databaseConfig } from "./config/database";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestContextMiddleware } from "./middleware/request.middleware";
import {AdminModule} from "./modules/admin/admin.module";
import {AuthModule} from "./modules/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // makes env variables available throughout the app
            load: [databaseConfig],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
                const dbConfig = configService.get<TypeOrmModuleOptions>('database');
                console.log(dbConfig);
                if (!dbConfig || typeof dbConfig !== 'object' || !dbConfig.type) {
                    throw new Error('❌ Invalid database config: missing "type" or config block');
                }

                return dbConfig;
            },
            inject: [ConfigService],
        }),
        AuthModule,
        AdminModule,
        
    ],
    controllers: [AppController,],
    providers: [AppService]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RequestContextMiddleware)
            .exclude(
                { path: 'health-check', method: RequestMethod.GET }
            )
            .forRoutes('*');
    }
}
