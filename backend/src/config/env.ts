import dotenv from 'dotenv'

dotenv.config();

interface EnvConfig {
    PORT: number;
    THEMEALDB_BASE_URL: string;
}

const env: EnvConfig = {
    PORT: Number(process.env.PORT) || 8080,
    THEMEALDB_BASE_URL: process.env.THEMEALDB_BASE_URL || 'https://www.themealdb.com/api/json/v1/1',
};

export default env;