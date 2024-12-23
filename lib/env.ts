// import { config } from 'dotenv';
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export default createEnv({
  server: {
    OPENAI_API_KEY: z.string(),
    POSTGRES_URL: z.string().url(),
    // AWS_REGION: z.string(),
  },
  clientPrefix: 'NEXT_PUBLIC_',
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },
  runtimeEnv: process.env,
});
