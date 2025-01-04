# Static web hosted on AWS S3 + CDN

- In `ops` directory we have the AWS CDK Setup
- After infra is created, run -
  - `aws s3 sync ./web/dist/ s3://my-web-assets-bucket` This will add assets to S3 and serve it via CDN
