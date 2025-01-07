#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { DomainStack } from '../lib/stacks/domainStack';
import { WebStack } from '../lib/stacks/webStack';

const DOMAIN_NAME = 'todo-pro.xyz';

const app = new cdk.App();

const throwError = () => {
  throw new Error('CERT_ARN & CDK_ACCOUNT must be set');
};

const CERT_ARN = process.env.CERT_ARN ?? throwError();
const CDK_ACCOUNT = process.env.CDK_ACCOUNT ?? throwError();

const webStack = new WebStack(app, 'WebStack', {
  bucketName: 'rocky-jaiswal-todopro-xyz-web-assets-bucket',
  domainName: DOMAIN_NAME,
  certificateArn: CERT_ARN,
  env: { account: CDK_ACCOUNT, region: 'eu-central-1' },
});

const domainStack = new DomainStack(app, 'DomainStack', {
  domainName: DOMAIN_NAME,
  distribution: webStack.distribution,
  env: { account: CDK_ACCOUNT, region: 'eu-central-1' },
  crossRegionReferences: true,
});
