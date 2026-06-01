import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().default("5000"),

    DATABASE_URL: z.string().min(1),

    JWT_SECRET: z.string().min(
        32,
        "JWT_SECRET should be at least 32 characters"
    ),
});

export const env = envSchema.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv
            extends z.infer<typeof envSchema> {}
    }
}