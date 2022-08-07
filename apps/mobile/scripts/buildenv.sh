echo \
"STACKUP_MOBILE_NETWORK_ENV=${STACKUP_MOBILE_NETWORK_ENV:-testnet}
STACKUP_MOBILE_EXPLORER_URL=${STACKUP_MOBILE_EXPLORER_URL:-http://localhost:3000}
STACKUP_MOBILE_BACKUP_URL=${STACKUP_MOBILE_BACKUP_URL:-http://localhost:3001}
STACKUP_MOBILE_BUNDLER_URL=${STACKUP_MOBILE_BUNDLER_URL:-http://localhost:3002}
STACKUP_MOBILE_NOTIFICATION_URL=${STACKUP_MOBILE_NOTIFICATION_URL:-http://localhost:3003}
STACKUP_MOBILE_AMPLITUDE_API_KEY=${STACKUP_MOBILE_AMPLITUDE_API_KEY}
STACKUP_MOBILE_SENTRY_DSN=${STACKUP_MOBILE_SENTRY_DSN}
STACKUP_MOBILE_INTERCOM_APP_ID=${STACKUP_MOBILE_INTERCOM_APP_ID}
STACKUP_MOBILE_INTERCOM_ANDROID_API_KEY=${STACKUP_MOBILE_INTERCOM_ANDROID_API_KEY}
STACKUP_MOBILE_INTERCOM_IOS_API_KEY=${STACKUP_MOBILE_INTERCOM_IOS_API_KEY}
STACKUP_MOBILE_RAMP_HOST_API_KEY=${STACKUP_MOBILE_RAMP_HOST_API_KEY}" \
> .env

echo \
"defaults.url=https://sentry.io/
defaults.org=stackup
defaults.project=stackup-mobile
auth.token=${STACKUP_MOBILE_SENTRY_AUTH_TOKEN}" \
| tee ./ios/sentry.properties ./android/sentry.properties

echo "Env files successfully generated."
