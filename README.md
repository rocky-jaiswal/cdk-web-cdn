# Static web hosted on AWS S3 + CDN with HTTPS & custom domain name

## CDK and TF

The setup is in 2 flavors - AWS CDK & Terraform (OpenTofu). This is for learning / experimentation purposes.


## Syncing S3 bucket

- In `ops` directory we have the AWS CDK Setup
- In `ops-tf` directory we have the OpenTofu / Terraform Setup
- In `web` we have a simple / sample web application code
- After infra is created, run -
  - `aws s3 sync ./web/dist/ s3://rocky-jaiswal-todopro-xyz-web-assets-bucket` This will add HTML assets to S3 and serve it via CDN
- TODO: Create "Invalidation" so that the CDN cache is invalidated


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
