# Terraform Azure Infra

This Terraform stack provisions the required Azure resources for this project:

- Resource Group
- Linux App Service Plan
- Azure Container Registry (ACR)
- Frontend Linux Web App (container)
- Backend Linux Web App (container)
- Required app settings for both apps

It also supports:

- Remote Terraform state in Azure Storage
- GitHub Actions automation for plan/apply
- Optional sync of Terraform outputs into GitHub Actions repository variables

## Prerequisites

- Terraform >= 1.5
- Azure CLI logged in (`az login`)
- Subscription selected (`az account set --subscription <id-or-name>`)

## Usage

1. Open this folder:
   - `cd infra/terraform`
2. Create your vars file:
   - `copy terraform.tfvars.example terraform.tfvars`
3. Edit `terraform.tfvars` with your real values.
4. Initialize:
   - `terraform init`
5. Review plan:
   - `terraform plan`
6. Apply:
   - `terraform apply`

## Remote State (Recommended)

1. Bootstrap a storage account and container for state.
2. Copy backend config template:
   - `copy backend.hcl.example backend.hcl`
3. Fill real values in `backend.hcl`.
4. Init with backend config:
   - `terraform init -backend-config=backend.hcl`

## GitHub Actions Terraform Automation

Workflow file:

- `.github/workflows/terraform-infra.yml`

Behavior:

- Pull requests: runs `plan`
- Push to `main`: runs `plan`, and can run `apply` when `TERRAFORM_AUTO_APPLY=true`
- Manual run (`workflow_dispatch`): choose `plan` or `apply`

Required GitHub Secrets:

- `AZURE_CREDENTIALS` (service principal JSON)
- `TERRAFORM_TFVARS` (multi-line content of your `terraform.tfvars`)

Optional GitHub Secrets:

- `TERRAFORM_BACKEND_HCL` (multi-line content of `backend.hcl` for remote state)
- `GH_ADMIN_TOKEN` (fine-grained token with actions variable write access)

Optional GitHub Variables:

- `TERRAFORM_AUTO_APPLY` = `true` to auto-apply on push to `main`

After apply, use output values to set GitHub repo variables:

- `RESOURCE_GROUP` = `resource_group_name`
- `ACR_NAME` = `acr_name`
- `ACR_LOGIN_SERVER` = `acr_login_server`
- `FRONTEND_WEBAPP_NAME` = `frontend_webapp_name`
- `BACKEND_WEBAPP_NAME` = `backend_webapp_name`

And set image vars in GitHub:

- `FRONTEND_IMAGE_NAME` = value used in tfvars (`frontend_image_name`)
- `BACKEND_IMAGE_NAME` = value used in tfvars (`backend_image_name`)
- `NEXT_PUBLIC_API_BASE_URL` = value used in tfvars (`next_public_api_base_url`)

When `GH_ADMIN_TOKEN` is provided, the Terraform workflow updates these repository variables automatically after a successful apply.

## Notes

- `acr_name`, `frontend_webapp_name`, and `backend_webapp_name` must be globally unique.
- This stack runs apps from `${image_name}:latest` by default.
- GitHub Actions can continue updating these containers by pushing new `latest` images.
