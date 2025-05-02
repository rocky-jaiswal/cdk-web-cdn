terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0" # Use a recent version
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket         = "my-cool-app-xyz-terraform-state-bucket-02-05-2025"
    key            = "terraform-${var.project_name}-${var.environment}.tfstate"
    dynamodb_table = "my-cool-app-xyz-terraform-state-lock-table-02-05-2025"
    region         = var.aws_region_eu
    encrypt        = true
  }
}
