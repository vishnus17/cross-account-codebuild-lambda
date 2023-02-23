#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MainAccountStack } from '../lib/main-account-stack';
import { env } from 'process';

const app = new cdk.App();
new MainAccountStack(app, 'MainAccountStack', {
  stage: 'sbx',
  workloadAccountNumber: 'MAIN_ACCOUNT_NUMBER',
  env: { account: env.account, region: env.region },
});