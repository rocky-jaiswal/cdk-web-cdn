import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';

import { Storage } from '../constructs/storage';

export interface WebStackProps extends cdk.StackProps {
  bucketName: string;
  domainName: string;
  certificateArn: string;
}

export class WebStack extends cdk.Stack {
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: WebStackProps) {
    super(scope, id, props);

    const certificate = acm.Certificate.fromCertificateArn(
      this,
      'CertificateArn',
      props.certificateArn,
    );

    const storage = new Storage(this, 'Storage', {
      bucketName: props.bucketName,
      domainName: props.domainName,
      certificate: certificate,
    });

    this.distribution = storage.distribution;

    // Export S3 bucket name
    new cdk.CfnOutput(this, 'BucketName', {
      value: storage.bucket.bucketName,
      description: 'S3 Bucket Name',
    });

    // Export CloudFront URL
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: storage.distribution.distributionArn,
      description: 'CloudFront Distribution Domain Name',
    });
  }
}
