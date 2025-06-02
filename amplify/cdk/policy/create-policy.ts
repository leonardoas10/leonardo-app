import { Effect, Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

// Define the type for specific service actions
type SqsActions =
  | 'sqs:DeleteMessage'
  | 'sqs:DeleteMessageBatch'
  | 'sqs:GetQueueAttributes'
  | 'sqs:ReceiveMessage'
  | 'sqs:SendMessage'
  | 'sqs:SendMessageBatch'
  | 'sqs:ChangeMessageVisibility'
  | 'sqs:ChangeMessageVisibilityBatch'
  | 'sqs:GetQueueUrl'
  | 'sqs:PurgeQueue';

type AppSyncActions = 'appsync:GraphQL';

type DynamoDbActions =
  | 'dynamodb:PutItem'
  | 'dynamodb:GetItem'
  | 'dynamodb:DeleteItem'
  | 'dynamodb:UpdateItem'
  | 'dynamodb:Scan'
  | 'dynamodb:Query'
  | 'dynamodb:GetRecords'
  | 'dynamodb:GetShardIterator'
  | 'dynamodb:DescribeStream'
  | 'dynamodb:ListStreams';

type ApiGatewayActions = 'execute-api:Invoke';

type IamActions = 'ssm:GetParameters';

type SesActions = 
  | 'ses:SendEmail'
  | 'ses:SendRawEmail';

type S3Actions =
  | 's3:GetObject'
  | 's3:PutObject'
  | 's3:DeleteObject'
  | 's3:ListBucket';

// Create a union of all actions
type ServiceActions =
  | SqsActions
  | AppSyncActions
  | DynamoDbActions
  | ApiGatewayActions
  | IamActions
  | SesActions
  | S3Actions;

/**
 * Creates an IAM policy with a specified set of actions, resources, and effect.
 * This function simplifies the process of defining and creating a policy in the AWS CDK.
 *
 * @param {Construct} scope - The scope in which this policy is created (e.g., a stack or construct).
 * @param {string[]} resources - A list of resource ARNs the policy applies to.
 * @param {string} policyName - The name of the policy to create. This will also be its unique identifier in the stack.
 * @param {Effect} effect - The effect of the policy statement (e.g., `Effect.ALLOW` or `Effect.DENY`).
 * @param {ServiceActions[]} actions - A list of actions the policy allows or denies (e.g., `["s3:PutObject", "s3:GetObject"]`).
 *
 * @returns {Policy} - An instance of the created IAM policy.
 */
export const createPolicy = (
  scope: Construct,
  resources: string[],
  policyName: string,
  effect: Effect,
  actions: ServiceActions[]
): Policy => {
  return new Policy(scope, policyName, {
    statements: [createPolicyStatement(resources, effect, actions)],
  });
};

/**
 * Creates an IAM policy statement with the provided access.
 *
 * @param {string[]} resources - A list of resource ARNs the policy applies to.
 * @param {Effect} effect - The effect of the policy statement (e.g., `Effect.ALLOW` or `Effect.DENY`).
 * @param {ServiceActions[]} actions - A list of actions the policy allows or denies (e.g., `["s3:PutObject", "s3:GetObject"]`).
 *
 * @returns {PolicyStatement} - An instance of the created IAM policy statement.
 */
export const createPolicyStatement = (
  resources: string[],
  effect: Effect,
  actions: ServiceActions[]
): PolicyStatement => {
  return new PolicyStatement({
    effect,
    actions,
    resources: resources,
  });
};
