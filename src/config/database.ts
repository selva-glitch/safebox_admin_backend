import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

/**
 * Represents the configuration settings required to establish a connection to a MySQL database.
 */
interface DatabaseConnectionConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
}

/**
 * Parses a given port string and returns its numeric value.
 * Defaults to 3306 for MySQL.
 */
const parsePort = (portStr: string | undefined): number =>
  portStr ? parseInt(portStr, 10) : 3306;

/**
 * Parses a string representation of an SSL value.
 */
const parseSSL = (sslStr: string | undefined): boolean =>
  sslStr === 'true';

/**
 * Extracts MySQL connection config from environment variables.
 */
const getEnvConfig = (): DatabaseConnectionConfig => ({
  host: process.env['DB_HOST'] || 'localhost',
  port: parsePort(process.env['DB_PORT']),
  username: process.env['DB_USER'] || 'root',
  password: process.env['DB_PASSWORD'] || '',
  database: process.env['DB_NAME'] || 'nest_demo',
  ssl: parseSSL(process.env['DB_SSL']),
});

/**
 * Registers a single MySQL database configuration using TypeORM.
 */
export const databaseConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => {
    const config = getEnvConfig();

    return {
      type: 'mysql', // ✅ Must be literal string
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      ssl: config.ssl,
     entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
      synchronize: true,
    };
  }
);

