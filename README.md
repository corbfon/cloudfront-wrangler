#CloudWatching

![what in titration meme](https://imgur.com/W4mzrtJ)

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

Supported options: `rs`

### options

`--refresh-stream`, `--rs` - Useful for developing in serverless. Refreshes the stream name that logs are polled from so that the latest stream is always polled.