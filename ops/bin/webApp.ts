#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { DomainStack } from '../lib/stacks/domainStack';
import { WebStack } from '../lib/stacks/webStack';

const app = new cdk.App();
const DOMAIN_NAME = 'todo-pro.xyz';

const throwError = () => {
  throw new Error('CERT_ARN must be set');
};

const CERT_ARN = process.env.CERT_ARN ?? throwError();

const webStack = new WebStack(app, 'WebStack', {
  bucketName: 'rocky-jaiswal-todopro-xyz-web-assets-bucket',
  domainName: DOMAIN_NAME,
  certificateArn: CERT_ARN,
  env: { account: '750324395434', region: 'eu-central-1' },
});

const domainStack = new DomainStack(app, 'DomainStack', {
  domainName: DOMAIN_NAME,
  distribution: webStack.distribution,
  env: { account: '750324395434', region: 'eu-central-1' },
  crossRegionReferences: true,
});
