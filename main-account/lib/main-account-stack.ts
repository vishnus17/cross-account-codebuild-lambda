import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface MainAccountStackProps extends cdk.StackProps {
  stage: string;
  workloadAccountNumber: string;
}
export class MainAccountStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MainAccountStackProps) {
    super(scope, id, props);
  
  const stage = props.stage 
  const workloadAccountNumber = props.workloadAccountNumber

  // Main account role which you want to assume
  const mainRole = new iam.Role(this, 'MainRole', {
    roleName: `mainaccount-role`,
    assumedBy: new iam.CompositePrincipal(
      new iam.ServicePrincipal('codebuild.amazonaws.com'),
      new iam.ArnPrincipal(`arn:aws:iam::${workloadAccountNumber}:role/lambda-execution-role`),
    ),
  });

  mainRole.addToPolicy(new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: [ 'codebuild:StartBuild' ],
    resources: [`arn:aws:codebuild:ca-central-1:${this.account}:project/codebuild-${stage}-01`],
  }));
  
  }
}
