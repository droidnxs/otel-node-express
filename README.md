### Node.js ExpressServer with OpenTelemetry Auto-Instrumentation

Makes use of zero-code instrumentation using `--import @opentelemetry/auto-instrumentations-node/register`.

Code-based auto-instrumentation is available in `src/instrumentation.ts` and can be enabled by modifying the start command in `package.json`.

## Requirements

- Node.js 20 or higher preferred

## Steps to run:

- `npm install`
- `export OTEL_LOG_LEVEL=debug`
- `export OTEL_TRACES_EXPORTER=console`
- `export OTEL_METRICS_EXPORTER=none`
- `export OTEL_LOGS_EXPORTER=none`
- `npm run start`
