# cross-account-codebuild-lambda

CDK Project to setup cross-account CodeBuild deployment using a Lambda function

[account1](https://github.com/vishnus17/cross-account-codebuild-lambda/tree/main/account1) is the workload account in the article. <br>

[main-account](https://github.com/vishnus17/cross-account-codebuild-lambda/tree/main/main-account) is the pipeline account.

## Useful commands

* `cdk deploy`      deploy this stack to your AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

Deploy the account1 CDK project into your workload account and deploy main-account project into your pipeline account.

### Article
Follow the article here for the complete walkthrough:
[cross-account-trigger-lambda](https://vishnusblog.tech/learn-how-to-use-a-lambda-function-to-trigger-a-codebuild-in-another-account)


