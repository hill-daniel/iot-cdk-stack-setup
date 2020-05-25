#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { IotProtobufCdkSetupStack } from '../lib/iot-protobuf-cdk-setup-stack';

const app = new cdk.App();
new IotProtobufCdkSetupStack(app, 'IotProtobufCdkSetupStack');
