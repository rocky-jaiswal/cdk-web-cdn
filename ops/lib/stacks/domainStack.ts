import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';

import { Dns } from '../constructs/dns';

export interface DomainStackProps extends cdk.StackProps {
  domainName: string;
  distribution: cloudfront.IDistribution;
}

export class DomainStack extends cdk.Stack {
  public readonly dns: Dns;

  constructor(scope: Construct, id: string, props: DomainStackProps) {
    super(scope, id, props);

    this.dns = new Dns(this, 'Dns', {
      domainName: props.domainName,
      distribution: props.distribution,
    });
  }
}
