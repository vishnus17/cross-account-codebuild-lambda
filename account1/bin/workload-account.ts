#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WorkloadAccountStack } from '../lib/workload-account-stack';
import { env } from 'process';

const app = new cdk.App();
new WorkloadAccountStack(app, 'WorkloadAccountStack', {
  stage: 'sbx',
  mainAccountNumber: 'WORKLOAD_ACCOUNT_NUMBER',
  env: { account: env.account, region: env.region },
});