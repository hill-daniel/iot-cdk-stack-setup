# CDK setup for processing protocol buffers messages with AWS IoT Core

## Part of the codecentric blog post ["Processing protocol buffers messages with AWS IoT Core"](https://blog.codecentric.de/en/2020/06/processing-protobufs-with-iot-core)

### This will setup the following:
 * Kinesis Data Stream - buffer incoming MQTT protobuf messages and hand them over to Lambda function
 * Lambda Function - de-serialize protobuf and store to DynamoDB
 * DynamoDB table - storage for de-serializes messages
 * Policies and permissions 

## Usage
 * `npm run build`
 * `cdk bootstrap aws://your-account-id/your-region`
 * `cdk synth`
 * `cdk deploy`

## Useful commands
 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk destroy`     destroy created resources to avoid incurring any costs
 * `cdk bootstrap aws://your-account-id/your-region`   deploys the toolkit stack  
