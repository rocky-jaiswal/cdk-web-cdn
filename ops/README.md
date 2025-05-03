# Welcome to your CDK TypeScript project

This is a project for AWS CDK development with TypeScript.

See `package.json` file for available commands.

## Setup

Main problem we solve is that the AWS HTTPS certificate has to be created in "us-east-1". That is why there are 2 CDK apps.

Steps -

1. Buy a domain from name.com (for example)
2. In the domain setting forward email - admin@domain.com to your email account
3. First create a Stack which creates a ACM certificate in us-east-1 (See `ops/package.json` for commands)
4. Approve the domain name email you get so that the certificate is validated
5. Note the certificate ARN output
6. Set env. var `CERT_ARN` to the ARN to the one noted above however you want
7. Then prepare + execute the other stack in eu-central-1, which creates the S3 bucket, CloudFront distribution & DNS Zone
8. The CDN distribution will use the certificate created earlier. We also add "A Record" in the DNS created with the distribution
9. After all is complete, update the nameservers on your domain name provider (e.g. name.com) to the AWS Route53 zone nameservers
