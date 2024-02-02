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
      case "dynamoDb": {
        const dynamoDb = process.env.IS_OFFLINE
          ? new AWS.DynamoDB.DocumentClient({
              region: "localhost",
              endpoint: "http://localhost:5000",
            })
          : new AWS.DynamoDB.DocumentClient();
        return await dynamoDb[action](params).promise();
      }
      default:
        throw new Error("No Service found.");
    }
  } catch (error) {
    throw new Error(error);
  }
};
