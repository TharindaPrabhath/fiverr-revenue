export interface Database {
  type?: string;
  host: string;
  port?: number;
  username: string;
  password: string;
  database: string;
  entities?: Array<string>;
  synchronize?: boolean;
  migrationsRun?: boolean;
  logging?: boolean;
  logger?: string;
  migrations?: Array<string>;
  cli?: { migrationsDir: string };
}
