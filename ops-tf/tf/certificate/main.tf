terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

variable "aws_region_us" {
  description = "AWS region where resources will be created."
  type        = string
  default     = "us-east-1"
}

variable "tags" {
  description = "Common tags to apply to all taggable resources."
  type        = map(string)
  default = {
    Project     = "my-cool-app-xyz"
    ManagedBy   = "Terraform"
  }
}

variable "domain_name" {
  description = "Domain name for the CloudFront distribution (e.g., www.example.com)."
  type        = string
  default     = "my-cool-app.xyz"
}

provider "aws" {
  region = var.aws_region_us
}

# Request the ACM certificate in us-east-1 using the provider alias
resource "aws_acm_certificate" "cert" {
  domain_name               = var.domain_name
  validation_method         = "EMAIL"

  tags = var.tags

  lifecycle {
    create_before_destroy = true # Helps avoid downtime during certificate renewals/changes
  }
}

output "acm_certificate_arn" {
  description = "ARN of ACM certificate."
  value       = aws_acm_certificate.cert.arn
}
