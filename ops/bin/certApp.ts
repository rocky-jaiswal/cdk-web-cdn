#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { CertificateStack } from '../lib/stacks/certificateStack';

const app = new cdk.App();

const DOMAIN_NAME = 'todo-pro.xyz';

new CertificateStack(app, 'CertificateStack', {
  domainName: DOMAIN_NAME,
  synthesizer: new cdk.DefaultStackSynthesizer({
    fileAssetsBucketName: 'rocky-jaiswal-todo-pro-xyz-cdk-assets',
  }),
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  env: { account: '750324395434', region: 'us-east-1' },
});
