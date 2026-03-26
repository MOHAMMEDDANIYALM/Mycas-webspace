param(
  [Parameter(Mandatory = $true)]
  [string]$Repo,

  [string]$TerraformDir = ".",

  [switch]$EnableAutoApply
)

$ErrorActionPreference = 'Stop'

function Ensure-Command {
  param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Required command '$Name' was not found in PATH."
  }
}

Ensure-Command gh

Write-Host "Checking GitHub auth..." -ForegroundColor Cyan
$authOk = $true
try {
  gh auth status | Out-Null
} catch {
  $authOk = $false
}

if (-not $authOk) {
  throw "GitHub CLI is not authenticated. Run: gh auth login -h github.com"
}

$tfvarsPath = Join-Path $TerraformDir "terraform.tfvars"
if (-not (Test-Path $tfvarsPath)) {
  throw "terraform.tfvars not found at: $tfvarsPath"
}

$backendPath = Join-Path $TerraformDir "backend.hcl"

Write-Host "Setting repository variables..." -ForegroundColor Cyan

gh variable set TERRAFORM_AUTO_APPLY --body ($EnableAutoApply.IsPresent ? "true" : "false") --repo $Repo | Out-Null

Write-Host "Setting required secrets from local files..." -ForegroundColor Cyan
$tfvarsContent = Get-Content $tfvarsPath -Raw
if ([string]::IsNullOrWhiteSpace($tfvarsContent)) {
  throw "terraform.tfvars is empty."
}
$tfvarsContent | gh secret set TERRAFORM_TFVARS --repo $Repo | Out-Null

if (Test-Path $backendPath) {
  $backendContent = Get-Content $backendPath -Raw
  if (-not [string]::IsNullOrWhiteSpace($backendContent)) {
    $backendContent | gh secret set TERRAFORM_BACKEND_HCL --repo $Repo | Out-Null
  }
}

Write-Host "Enter AZURE_CREDENTIALS JSON (single line)." -ForegroundColor Yellow
$azureCreds = Read-Host
if ([string]::IsNullOrWhiteSpace($azureCreds)) {
  throw "AZURE_CREDENTIALS cannot be empty."
}

try {
  $json = $azureCreds | ConvertFrom-Json
} catch {
  throw "AZURE_CREDENTIALS is not valid JSON. Paste the full service principal JSON from Azure." 
}

foreach ($requiredKey in @('clientId', 'clientSecret', 'subscriptionId', 'tenantId')) {
  if (-not ($json.PSObject.Properties.Name -contains $requiredKey) -or [string]::IsNullOrWhiteSpace($json.$requiredKey)) {
    throw "AZURE_CREDENTIALS JSON is missing required key: $requiredKey"
  }
}

$azureCreds | gh secret set AZURE_CREDENTIALS --repo $Repo | Out-Null

Write-Host "Optional: GH_ADMIN_TOKEN (press Enter to skip)" -ForegroundColor Yellow
$adminToken = Read-Host
if (-not [string]::IsNullOrWhiteSpace($adminToken)) {
  $adminToken | gh secret set GH_ADMIN_TOKEN --repo $Repo | Out-Null
}

Write-Host "Done. Secrets/variables configured for $Repo" -ForegroundColor Green
Write-Host "Next: push infra changes or run the Terraform Infra workflow (apply)." -ForegroundColor Green
