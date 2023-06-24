// EXTERNAL
import * as AWS from "aws-sdk";
AWS.config.update({ region: process.env.REGION });

export const call = async (
  service: string,
  action: string,
  params: any
): Promise<any> => {
  try {
    switch (service) {
      case "s3": {
        const s3 = new AWS.S3();
        return await s3[action](params).promise();
      }
      case "dynamoDb": {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        return await dynamoDb[action](params).promise();
      }
      case "lambda": {
        const lambda = new AWS.Lambda();
        return await lambda[action](params).promise();
      }
      default:
        throw new Error("No Service found.");
    }
  } catch (error) {
    throw error;
  }
};
