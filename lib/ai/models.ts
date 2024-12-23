/**
 * Enum representing supported AI model providers
 */
export enum ModelProvider {
  OpenAI = 'openai',
  Bedrock = 'bedrock',
}

/**
 * Base interface for common model properties
 */
export interface BaseModel {
  readonly id: string;
  readonly label: string;
  readonly apiIdentifier: string;
  readonly description: string;
  readonly provider: ModelProvider;
}

/**
 * Type for OpenAI-specific models
 */
export interface OpenAIModel extends BaseModel {
  readonly provider: ModelProvider.OpenAI;
  readonly id: `gpt-${string}`;
}

/**
 * Type for Bedrock-specific models
 */
export interface BedrockModel extends BaseModel {
  readonly provider: ModelProvider.Bedrock;
  readonly id: `us.${string}`; // only supporting inference profiles for now
}

/**
 * Union type for all supported models
 */
export type Model = OpenAIModel | BedrockModel;

/**
 * Type guard to check if a model is an OpenAI model
 */
export const isOpenAIModel = (model: Model): model is OpenAIModel => {
  return model.provider === ModelProvider.OpenAI;
};

/**
 * Type guard to check if a model is a Bedrock model
 */
export const isBedrockModel = (model: Model): model is BedrockModel => {
  return model.provider === ModelProvider.Bedrock;
};

export const models = [
  {
    id: 'gpt-4o-mini',
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
    provider: ModelProvider.OpenAI,
  },
  {
    id: 'gpt-4o',
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    description: 'For complex, multi-step tasks',
    provider: ModelProvider.OpenAI,
  },
  {
    id: 'us.anthropic.claude-3-5-haiku-20241022-v1:0',
    label: 'Claude 3.5 haiku',
    apiIdentifier: 'us.anthropic.claude-3-5-haiku-20241022-v1:0',
    description: 'For needs for speeds',
    provider: ModelProvider.Bedrock,
  },
  {
    id: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0',
    label: 'Claude 3.5 sonnet',
    apiIdentifier: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0',
    description: 'For outsmarting humans',
    provider: ModelProvider.Bedrock,
  },
  {
    id: 'us.amazon.nova-pro-v1:0',
    label: 'Amazon Nova Pro',
    apiIdentifier: 'us.amazon.nova-pro-v1:0',
    description: 'For outsmarting select humans',
    provider: ModelProvider.Bedrock,
  },
] as const;

/**
 * Type representing valid model IDs based on the models array
 */
export type ModelId = (typeof models)[number]['id'];

/**
 * Default model ID with type safety
 */
export const DEFAULT_MODEL_ID: ModelId =
  'us.anthropic.claude-3-5-haiku-20241022-v1:0';

/**
 * Utility function to find a model by ID
 */
export const findModelById = (id: string): Model | undefined => {
  return models.find((model) => model.id === id);
};

/**
 * Utility function to check if a model ID is valid
 */
export const isValidModelId = (id: string): id is ModelId => {
  return models.some((model) => model.id === id);
};

/**
 * Function to get a model by ID
 */
export const getModelById = (id: string): Model => {
  const model = findModelById(id);
  if (!model) {
    throw new Error(`Invalid model ID: ${id}`);
  }
  return model;
};
