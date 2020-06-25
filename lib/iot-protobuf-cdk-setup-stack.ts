import {App, Duration, RemovalPolicy, Stack, StackProps} from '@aws-cdk/core';
import {AttributeType, Table} from '@aws-cdk/aws-dynamodb';
import {Stream} from '@aws-cdk/aws-kinesis';
import {Code, Function, Runtime, StartingPosition} from '@aws-cdk/aws-lambda';
import {KinesisEventSource} from '@aws-cdk/aws-lambda-event-sources';
import * as path from 'path';

export class IotProtobufCdkSetupStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        const deviceTableName = 'iot_device_log'

        const protobufProcessing = new Function(this, 'Protobuf Processing', {
            functionName: "iot_process_messages",
            runtime: Runtime.GO_1_X,
            handler: 'main',
            code: Code.fromAsset(path.join(__dirname, '../../iot-protobuf-lambda/function.zip')),
            timeout: Duration.seconds(5),
            environment: {
                dynamo_device_log_table: deviceTableName,
            }
        });

        const deviceLogTable = new Table(this, 'Device Log Table', {
            tableName: deviceTableName,
            partitionKey: {name: 'id', type: AttributeType.STRING},
            sortKey: {name: 'last_updated', type: AttributeType.NUMBER},
            removalPolicy: RemovalPolicy.DESTROY, // not recommended for production
        });
        deviceLogTable.grantReadWriteData(protobufProcessing);

        const protoBufMessages = new Stream(this, 'Protobuf IoT Messages', {
            streamName: 'iot_protobuf_messages'
        });
        protoBufMessages.grantRead(protobufProcessing)

        protobufProcessing.addEventSource(new KinesisEventSource(protoBufMessages, {
            batchSize: 100, // default
            startingPosition: StartingPosition.TRIM_HORIZON
        }))
    }
}
