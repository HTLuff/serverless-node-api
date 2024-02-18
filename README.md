# Serverless - AWS Node.js Typescript

[![TypeScript](https://img.shields.io/npm/types/typescript?color=blue)](https://www.typescriptlang.org/)
[![AWS](https://img.shields.io/badge/AWS-Yes-orange.svg)](https://aws.amazon.com/)
[![Serverless Framework](https://img.shields.io/badge/Serverless%20Framework-red.svg)](https://www.serverless.com/)

## Table of Contents

- [About](#about)
- [Example](#example)
- [Usage](#usage)
- [Roadmap](#usage)

## About

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

- ✅ Serverless Typescript
- ✅ NodeJS CRUD API with Lambda functions through API Gateway
- ✅ DynamoDB data storage
- ✅ Authentication with JWTs and hashed passwords, not Cognito
- ✅ Unit and offline testing

| Methods | Endpoint | Input | Output         |
| ------- | -------- | ----- | -------------- |
| POST    | `/users` | `{}`  | `{id: string}` |
| GET    | `/users` | `{}`  | `{id: string}` |
| GET    | `/users` | `{}`  | `{id: string}` |
| DELETE    | `/users/{id}` | `{}`  | `{id: string}` |
| PUT    | `/users/{id}` | `{}`  | `{id: string}` |
| POST    | `/auth/login` | `{}`  | `{id: string}` |
| POST    | `/auth/change-password` | `{}`  | `{id: string}` |
| POST    | `/auth/unsubscribe` | `{}`  | `{id: string}` |

### JWT Auth flow

1. Register with username, password, password hash gets stored in DB
2. Login with Username / Password
3. If hash of password matches stored passwordHash for user, generate a JWT token from user's id and their auth scope
4. Save token in Cookie 🍪
5. Sign every request with this token in the HTTP Authorization header
6. Setup authorizer function that verifies this token (on requesting a secured api route). authorizer response can be cached for a certain amount to increase api throughput.
7. Authorizer generates a policyDocument that allows or denies access to the service

### Test Locally

In order to test the users function locally, run the following command:

- `npx sls invoke local -f users --path src/functions/users/mock.json` if you're using NPM
- `yarn sls invoke local -f users --path src/functions/users/mock.json` if you're using Yarn

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Test Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test the newly deployed application.

```bash
curl --location --request POST 'https://myApiEndpoint/dev/users/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Harry"
}'
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

## Example

TBD

## Usage

TBD

## Roadmap

- [ ] add custom authorizer to lambda, instead of using api-gateway lib
- [ ] add password reset flow with accompanying SES resources
