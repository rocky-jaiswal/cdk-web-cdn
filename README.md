# Static web hosted on AWS S3 + CDN with HTTPS & custom domain name

## Commands

All commands are in `ops/package.json`

## Setup

Main problem we solve is that the AWS HTTPS certificate has to be created in "us-east-1". That is why there are 2 CDK apps.

Steps -

1. Buy a domain from name.com (for example)
2. In the domain setting forward email - admin@domain.com to your email account
3. First create a Stack which creates a ACM certificate in us-east-1 (See `ops/package.json` for commands)
4. Approve the domain name email you get so the certificate is validated
5. Note the certificate ARN output
6. Set env. var `CERT_ARN` to the ARN to the one noted above however you want
7. Then prepare + execute the other stack in eu-central-1, which creates the S3 bucket, CloudFront distribution & DNS Zone
8. The CDN distribution will use the certificate created earlier. We also add "A Record" in the DNS created with the distribution
9. After all is complete, update the nameservers on your domain name provider (e.g. name.com) to the AWS Route53 zone nameservers


## Syncing S3 bucket

- In `ops` directory we have the AWS CDK Setup
- In `web` we have the web application code
- After infra is created, run -
  - `aws s3 sync ./web/dist/ s3://rocky-jaiswal-todopro-xyz-web-assets-bucket` This will add assets to S3 and serve it via CDN


## User Management

- Use AWS CLI
- Create 2 users, 1 for provisioning and 1 for deployment
- Both user can only do STS assume role
- Create 2 roles
- 1st role for provisioning
  - Full access to Route53, AWS ACM (Certificate Management), CloudFront (CDN), Cloudformation and S3
- 2nd role for deployment
  - Read/Write/Delete access to S3 (specific bucket only) and to create / read (specific) CloudFront CDN Invalidation
- When provisioning assume 1 role, and when deploying assume another (different / minimal time range)
