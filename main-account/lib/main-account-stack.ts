import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MainAccountStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  // Main account role which you want to assume
  const mainRole = new iam.Role(this, 'MainRole', {
    assumedBy: new iam.CompositePrincipal(
      new iam.ServicePrincipal('lambda.amazonaws.com'),
      new iam.ArnPrincipal(`arn:aws:iam::123456789012:role/lambda-execution-role`),
    ),
  });

  mainRole.addToPolicy(new iam.PolicyStatement({
    actions: [
      'sts:AssumeRole',
    ],
    resources: [`arn:aws:iam::123456789012:role/DeployerRole`],
  }));

  
  
  }
}
