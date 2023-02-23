var AWS = require('aws-sdk');
var codebuild = new AWS.CodeBuild();
const sts = new AWS.STS();

exports.handler = async (event, context) => {
    try {
    // assume role for pipeline account
    const assumeRoleParams = {
        RoleArn: process.env.ROLE_ARN,
        RoleSessionName: 'CodeBuildTrigger',
    };
    const assumeRoleResponse = await sts.assumeRole(assumeRoleParams).promise();

    // set credentials for pipeline account
    var config = new AWS.Config({
        accessKeyId: assumeRoleResponse.Credentials.AccessKeyId,
        secretAccessKey: assumeRoleResponse.Credentials.SecretAccessKey,
        sessionToken: assumeRoleResponse.Credentials.SessionToken,
    });

    // set pipeline account credentials for codebuild
    codebuild = new AWS.CodeBuild(config);
    
    // Deploy to pipeline account using CodeBuild with the assumed role
    const codebuildParams = {
        projectName: process.env.PROJECT_NAME,
        environmentVariablesOverride: [
            {
                name: 'DEPLOYER_ROLE',
                value: process.env.ROLE_ARN,
                type: 'PLAINTEXT',
            },
        ],
    };
    const codebuildResponse = await codebuild.startBuild(codebuildParams).promise();
    console.log('codebuildResponse: ', codebuildResponse);
        
    return {
        statusCode: 200,
        body: JSON.stringify('done'),
    };
    }catch (err) {
        console.log('err: ', err);
    }
};