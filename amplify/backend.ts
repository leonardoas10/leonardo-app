import { defineBackend } from '@aws-amplify/backend';
import { Stack } from 'aws-cdk-lib';
import { Effect } from 'aws-cdk-lib/aws-iam';

// import { auth } from './auth/resource.js';
import { createPolicy, addPolicyToLambda } from './cdk/policy/';
import { data } from './data/resource';
import { sendCVMutation } from './functions/cv/mutations/send-cv/resource';
import { EnviromentVariables } from './utils/constants';

const backend = defineBackend({
    data,
    sendCVMutation,
});

// Force a new AppSync API key when the old one expired/was deleted (CF drift).
backend.data.resources.cfnResources.cfnApiKey?.overrideLogicalId(
    'GraphQLApiKeyV2'
);

// ---------- LAMBDAS ----------- //

const SEND_CV_MUTATION_FUNCTION = backend.sendCVMutation.resources.lambda;

// ---------- END LAMBDAS ----------- //

// ---------- POLICIES ----------- //
const customResourceStack = Stack.of(backend.sendCVMutation.stack);

const sesIdentityArn = EnviromentVariables.SES_IDENTITY_ARN;
if (!sesIdentityArn) {
    throw new Error(
        'SES_IDENTITY_ARN is required (verified SES identity ARN, not *)'
    );
}

const sesConfigurationSetArn = EnviromentVariables.SES_CONFIGURATION_SET_ARN;
if (!sesConfigurationSetArn) {
    throw new Error(
        'SES_CONFIGURATION_SET_ARN is required when the SES identity uses a default configuration set'
    );
}

const cvBucketArn = EnviromentVariables.CV_BUCKET_ARN;
if (!cvBucketArn) {
    throw new Error('CV_BUCKET_ARN is required for S3 CV read policy');
}

const sesPolicy = createPolicy(
    customResourceStack,
    [sesIdentityArn, sesConfigurationSetArn],
    'SESPolicy',
    Effect.ALLOW,
    ['ses:SendEmail', 'ses:SendRawEmail']
);

const s3Policy = createPolicy(
    customResourceStack,
    [`${cvBucketArn}/*`],
    'S3CVPolicy',
    Effect.ALLOW,
    ['s3:GetObject']
);

// Add policies to the Lambda function
addPolicyToLambda(SEND_CV_MUTATION_FUNCTION, sesPolicy);
addPolicyToLambda(SEND_CV_MUTATION_FUNCTION, s3Policy);

// ---------- END POLICIES ----------- //
