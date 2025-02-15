import { openai } from '@ai-sdk/openai';
import bedrock from './bedrock-client';
import { groq } from '@ai-sdk/groq';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';

const providerMap: Record<string, (apiIdentifier: string) => any> = {
  'us.anthropic.claude-3-5-haiku-20241022-v1:0': bedrock,
  'us.anthropic.claude-3-5-sonnet-20241022-v2:0': bedrock,
  'us.amazon.nova-pro-v1:0': bedrock,
  'gpt-4o': openai,
  'gpt-4o-mini': openai,
  'llama-3.3-70b-specdec': groq,
};

export const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: providerMap[apiIdentifier](apiIdentifier),
    middleware: customMiddleware,
  });
};

export const imageGenerationModel = openai.image('dall-e-3');
