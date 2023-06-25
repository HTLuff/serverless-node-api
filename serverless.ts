// TYPES
import type { AWS } from "@serverless/typescript";
// FUNCTIONS
import { manageUsers } from "@functions/users";

const serverlessConfiguration: AWS = {
  service: "serverless-node-api",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    logRetentionInDays: 14,
    versionFunctions: false,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  functions: { manageUsers },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
      watch: {
        pattern: ["src/**/*.ts"],
        ignore: [
          "src/**/*.test.ts",
          "src/**/*.router.ts",
          "src/functions/**/index.ts",
        ],
      },
    },
    "serverless-offline": {
      httpPort: 4000,
      noAuth: true,
      noPrependStageInUrl: true,
    },
  },
};

module.exports = serverlessConfiguration;
