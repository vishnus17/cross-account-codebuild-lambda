# cross-account-codebuild-lambda
Lambda function to start a cross account codebuild deployment.

[account1](https://github.com/vishnus17/cross-account-codebuild-lambda/tree/main/account1) is the workload account in the article. <br>

[main-account](https://github.com/vishnus17/cross-account-codebuild-lambda/tree/main/main-account) is the pipeline account.

## Useful commands

* `cdk deploy`      deploy this stack to your AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


Make sure to do `npm install` in the root directory as well as the lambda directory.

### Article
Follow the article here for the complete walkthrough:
[cross-account-trigger-lambda](https://vishnusblog.tech/lambda-function-cross-account-assume-role-action-example)


