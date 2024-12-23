import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';

const bedrock = createAmazonBedrock({
  bedrockOptions: {
    region: 'us-east-1',
  },
});

export default bedrock;