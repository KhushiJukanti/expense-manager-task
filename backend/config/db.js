const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

// Initialize AWS SDK v3 and DynamoDB Document Client
const client = new DynamoDBClient({
    region: 'ap-south-1', // e.g., 'us-west-2'
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const dynamoDb = DynamoDBDocumentClient.from(client);

module.exports = dynamoDb;
