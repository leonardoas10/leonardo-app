import { defineBackend } from '@aws-amplify/backend';
import { Effect } from 'aws-cdk-lib/aws-iam';
import { Stack } from 'aws-cdk-lib';
// import { auth } from './auth/resource.js';
import { data } from './data/resource';
import { sendCVMutation } from './functions/cv/mutations/send-cv/resource';
import { createPolicy, addPolicyToLambda } from './cdk/policy/';

const backend = defineBackend({
    data,
    sendCVMutation,
});

// ---------- LAMBDAS ----------- //

const SEND_CV_MUTATION_FUNCTION = backend.sendCVMutation.resources.lambda;

// ---------- END LAMBDAS ----------- //

// ---------- POLICIES ----------- //
const customResourceStack = Stack.of(backend.sendCVMutation.stack);

const sesPolicy = createPolicy(
    customResourceStack,
    ['*'],
    'SESPolicy',
    Effect.ALLOW,
    ['ses:SendEmail', 'ses:SendRawEmail']
);

const s3Policy = createPolicy(
    customResourceStack,
    ['arn:aws:s3:::leonardo-app-content/*'],
    'S3CVPolicy',
    Effect.ALLOW,
    ['s3:GetObject']
);

// Add policies to the Lambda function
addPolicyToLambda(SEND_CV_MUTATION_FUNCTION, sesPolicy);
addPolicyToLambda(SEND_CV_MUTATION_FUNCTION, s3Policy);

// ---------- END POLICIES ----------- //
