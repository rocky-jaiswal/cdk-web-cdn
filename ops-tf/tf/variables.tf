variable "aws_region_us" {
  description = "AWS region where resources will be created."
  type        = string
  default     = "us-east-1" # CloudFront is global, but some resources like ACM certs for CF must be in us-east-1
  # S3 bucket can be in another region if preferred.
}

variable "aws_region_eu" {
  description = "AWS region where resources will be created."
  type        = string
  default     = "eu-central-1"
}

variable "project_name" {
  description = "A short name for the project, used in resource naming."
  type        = string
  default     = "my-cool-app-xyz"
}

variable "environment" {
  description = "Deployment environment (e.g., dev, staging, prod)."
  type        = string
  default     = "dev"
}

variable "tags" {
  description = "Common tags to apply to all taggable resources."
  type        = map(string)
  default = {
    Project     = "my-cool-app-xyz"
    Environment = "Development"
    ManagedBy   = "Terraform"
  }
}

# --- Optional: For Custom Domain ---
# variable "custom_domain_name" {
#   description = "Optional: Custom domain name for the CloudFront distribution (e.g., www.example.com)."
#   type        = string
#   default     = "my-cool-app-xyz"
# }

# variable "acm_certificate_arn" {
#   description = "Optional: ARN of the ACM certificate (must be in us-east-1 for CloudFront)."
#   type        = string
#   default     = null # Set the ARN here if using a custom domain with HTTPS
# }