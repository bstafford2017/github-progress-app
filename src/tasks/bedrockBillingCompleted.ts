import { useChangeStore } from '../store/changeStore';

// Bedrock Billing Alert Task - Completed
export const bedrockBillingTask = {
  title: "Create Bedrock Billing Alert Infrastructure",
  description: "Deploy daily AWS Bedrock billing alerts via Terraform/AWS CLI with SNS, Lambda, EventBridge. Infrastructure includes Lambda function, EventBridge scheduler, SNS notifications, CloudWatch logging.",
  purpose: "Automated daily billing notifications for Bedrock costs to b.stafford2017@gmail.com at 8 AM UTC",
  status: "completed",
  timestamp: new Date("2026-11-18T02:19:00Z"),
  prUrl: "https://github.com/bstafford2017/bedrock-billing-iac",
  branchName: "main",
  resources: [
    "SNS Topic: bedrock-billing-billing-alerts",
    "Lambda Function: bedrock-billing-billing-checker (Python 3.11)",
    "EventBridge Rule: bedrock-billing-daily-trigger",
    "CloudWatch Log Group: /aws/lambda/bedrock-billing-billing-checker",
    "IAM Role: bedrock-billing-lambda-role"
  ],
  deployment_method: "AWS CLI",
  account_id: "749936333804",
  region: "us-east-1"
};

// Auto-add to store on mount
export const useBedrockBillingTask = () => {
  const addChange = useChangeStore((state) => state.addChange);
  
  React.useEffect(() => {
    addChange(bedrockBillingTask);
  }, []);
};
