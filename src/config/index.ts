import Joi from 'joi';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the Joi schema for validation
const envVarsSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MONGODB_URL: Joi.string().required(),
}).unknown().required();

// Validate the process environment variables
const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Export the validated environment variables
export const port = envVars.PORT;
export const mongodbUrl = envVars.MONGODB_URL;
