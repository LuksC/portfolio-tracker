import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    mongo: {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    google: {
      id: process.env.GOOGLE_ID,
      secret: process.env.GOOGLE_SECRET,
      callback: process.env.GOOGLE_CALLBACK,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
