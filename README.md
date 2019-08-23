#CloudWatching

[![build](https://codebuild.us-west-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiYlZqVmZMaVo2eXlsUFN0aDhraVNMYjlUZk5XcGQ3S0ZReHJaU2l6eU56TnJCUmZGOG1FY3h5dHV0NVhtOTVrQ01WVUhpQ2cyaGd5WjkwenRkTk8wdXhrPSIsIml2UGFyYW1ldGVyU3BlYyI6IldWYURGRHQvVXEreTZsWE8iLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)](https://github.com/corbfon/cloudwatching)

Ever get tired of using the AWS console to look at CloudFront logs? Now you won't have to, because CloudWatching will get those logs to your terminal. CloudFront doesn't offer streaming, so in order to get the latest logs, you have to long-poll the log queue. CloudWatching does this for you by wrapping the aws-sdk for CloudFront, and automatically fetches the latest logs for a specified log group.

## Installation

```bash
npm install --global cloudwatching
```

## How to Watch Clouds (commands)

### fetch

Poll the latest logs by group name. Comes with 10 logs and will add new ones every 2 seconds.

```bash
cloudwatching fetch -n <group-name> <options>
```

Supported options: `refresh-stream`, `region`

### options

`--refresh-stream`, `--rs` - Useful for developing in serverless. Refreshes the stream name that logs are polled from so that the latest stream is always polled.

`-region`, `-r` - Set the AWS region. Default: your [default aws cli region](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html) or `us-west-2`