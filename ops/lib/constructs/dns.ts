import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';

import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as targets from 'aws-cdk-lib/aws-route53-targets';

export interface DnsProps {
  domainName: string;
  distribution: cloudfront.IDistribution;
  createHostedZone?: boolean;
}

export class Dns extends Construct {
  public readonly hostedZone: route53.IHostedZone;

  constructor(scope: Construct, id: string, props: DnsProps) {
    super(scope, id);

    // Create or import hosted zone
    this.hostedZone = props.createHostedZone
      ? new route53.PublicHostedZone(this, 'HostedZone', {
          zoneName: props.domainName,
        })
      : route53.HostedZone.fromLookup(this, 'HostedZone', {
          domainName: props.domainName,
        });

    // Create Route 53 alias record
    new route53.ARecord(this, 'AliasRecord', {
      zone: this.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(props.distribution),
      ),
      recordName: props.domainName,
    });
  }
}
