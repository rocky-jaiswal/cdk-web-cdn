import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';

import { Construct } from 'constructs';
import { Storage } from '../constructs/storage';
import { Dns } from '../constructs/dns';

export interface WebAssetsStackProps extends cdk.StackProps {
  bucketName: string;
  domainName: string;
  createHostedZone?: boolean;
}

export class OpsStack extends cdk.Stack {
  public readonly certificate: acm.ICertificate;

  constructor(scope: Construct, id: string, props: WebAssetsStackProps) {
    super(scope, id, props);

    const storage = new Storage(this, 'Storage', {
      bucketName: props.bucketName,
    });

    new Dns(this, 'Dns', {
      domainName: props.domainName,
      distribution: storage.distribution,
      createHostedZone: props.createHostedZone,
    });

    // Create ACM certificate
    this.certificate = new acm.Certificate(this, 'Certificate', {
      domainName: props.domainName,
      validation: acm.CertificateValidation.fromEmail({
        domainName: props.domainName,
      }),
    });

    Object.assign(storage, {
      domainName: props.domainName,
      certificate: this.certificate,
    });

    // Export CloudFront URL
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: storage.distribution.distributionDomainName,
      description: 'CloudFront Distribution Domain Name',
    });

    // Export S3 bucket name
    new cdk.CfnOutput(this, 'BucketName', {
      value: storage.bucket.bucketName,
      description: 'S3 Bucket Name',
    });
  }
}
