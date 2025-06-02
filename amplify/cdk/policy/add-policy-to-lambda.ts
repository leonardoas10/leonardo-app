import { Policy } from 'aws-cdk-lib/aws-iam';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

/**
 * Attaches an IAM policy to the execution role of a specified Lambda function.
 * This provides the Lambda function with additional permissions defined in the policy.
 *
 * @param {IFunction} lambda - The Lambda function to which the policy will be attached.
 * @param {Policy} policy - The IAM policy to attach to the Lambda's execution role.
 *
 * @return void
 */
export const addPolicyToLambda = (lambda: IFunction, policy: Policy): void => {
  lambda.role?.attachInlinePolicy(policy);
};
