import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export interface WorkloadAccountStackProps extends cdk.StackProps {
  stage: string;
  mainAccountNumber: string;
}

export class WorkloadAccountStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: WorkloadAccountStackProps) {
    super(scope, id, props);
    const stage = props.stage;
    const mainAccountNumber = props.mainAccountNumber;

    const role = new iam.Role(this, 'SampleRole', {
      roleName: `lambda-execution-role`,
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('lambda.amazonaws.com'),
        new iam.ArnPrincipal(`arn:aws:iam::${mainAccountNumber}:role/mainaccount-role`), // This is for letting the lambda assume the role in the main account
      ),
        managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    role.addToPolicy(new iam.PolicyStatement({
      actions: [
        'sts:AssumeRole',
      ],
      resources: [`arn:aws:iam::${mainAccountNumber}:role/mainaccount-role`],
    }));

    // Lambda function
    const triggerLambda = new lambda.Function(this, 'SampleLambda', {
      functionName: `lambda-crossaccountTrigger-${stage}`,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_16_X,
      timeout: cdk.Duration.seconds(60),
      environment: {
        PROJECT_NAME:`codebuild-${stage}-01`,
        ROLE_ARN: `arn:aws:iam::${mainAccountNumber}:role/mainaccount-role`,
      },
      role: role,
    });
  }
}
