#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { CertificateStack } from '../lib/stacks/certificateStack';

const DOMAIN_NAME = 'todo-pro.xyz';

const app = new cdk.App();

new CertificateStack(app, 'CertificateStack', {
  domainName: DOMAIN_NAME,
  synthesizer: new cdk.DefaultStackSynthesizer({
    fileAssetsBucketName: 'rocky-jaiswal-todo-pro-xyz-cdk-assets',
  }),
  env: { account: process.env.CDK_ACCOUNT, region: 'us-east-1' },
});
