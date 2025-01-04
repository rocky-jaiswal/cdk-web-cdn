import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Storage } from '../constructs/storage';

export interface WebAssetsStackProps extends cdk.StackProps {
  bucketName: string;
}

export class OpsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: WebAssetsStackProps) {
    super(scope, id, props);

    const storage = new Storage(this, 'Storage', {
      bucketName: props.bucketName,
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
