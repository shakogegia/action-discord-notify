# Hello world javascript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yml
uses: actions/hello-world-javascript-action@v1.1
with:
  status: ${{ job.status }}
  job_name: ${{ github.workflow }}
  webhook: ${{ secrets.SLACK_WEBHOOK_URL }}
```