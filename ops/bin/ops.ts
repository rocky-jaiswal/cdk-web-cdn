#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { OpsStack } from '../lib/stacks/ops-stack';

const app = new cdk.App();

new OpsStack(app, 'OpsStackNew', {
  bucketName: 'rocky-jaiswal-todopro-xyz-web-assets-bucket',
  domainName: 'todo-pro.xyz',
  createHostedZone: true,
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  env: { account: '750324395434', region: 'us-east-1' },
});
