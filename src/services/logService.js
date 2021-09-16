import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

const init = () => {
  Sentry.init({
    dsn: 'https://4885944b90614ae9826de550b6bd3ce2@o1002268.ingest.sentry.io/5962420',
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  })
}

const log = error => {
  Sentry.captureException(error)
}

const logger = {
  init,
  log,
}

export default logger
