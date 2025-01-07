#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { DomainStack } from '../lib/stacks/domainStack';
import { WebStack } from '../lib/stacks/webStack';

const app = new cdk.App();

const webStack = new WebStack(app, 'WebStack', {
  bucketName: 'rocky-jaiswal-todopro-xyz-web-assets-bucket',
  domainName: 'todo-pro.xyz',
  certificateArn:
    'arn:aws:acm:us-east-1:750324395434:certificate/126fae01-1844-4edb-977a-dadc16771b79',
  env: { account: '750324395434', region: 'eu-central-1' },
});

const domainStack = new DomainStack(app, 'DomainStack', {
  domainName: 'todo-pro.xyz',
  distribution: webStack.distribution,
  env: { account: '750324395434', region: 'eu-central-1' },
  crossRegionReferences: true,
});
