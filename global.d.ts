declare namespace NodeJS {
  export interface Global {
    testFactory: typeof testFactory;
  }
  interface ProcessEnv {
    NODE_ENV: string;
    JWT_SECRET: string;
    PUBLIC_API_JWT_SECRET: string;
    SENDGRID_API_KEY: string;
    SEND_EMAIL_FROM_EMAIL: string;
    SEND_EMAIL_FROM_NAME: string;
    SIGN_UP_TEMPLATE_ID: string;
    PASSWORD_HAS_BEEN_RESETED_TEMPLATE_ID: string;
    REDIS_PORT: number;
    REDIS_HOST: string;
    ELASTICSEARCH_HOST: string;
    ELASTICSEARCH_USERNAME: string;
    ELASTICSEARCH_PASSWORD: string;
    SHOPIFY_API_KEY: string;
    SHOPIFY_API_SECRET: string;
    SCOPES: string;
    HOST: string;
    SUPPORT_EMAIL_ADDRESS: string;
    EMAIL_TO_SUPPORT_TEMPLATE_ID: string;
    BASIC_AUTH_PASS: string;
    CDN_URL: string;
    AWS_BUCKET: string;
    AWS_REGION: string;
    AWS_EXPORT_CSV_BUCKET: string;
    CSV_QUEUE_CONCURRENCY: string;
    IMAGES_COPY_QUEUE_CONCURRENCY: string;
    IMPORT_QUEUE_CONCURRENCY: string;
    EXPORT_QUEUE_CONCURRENCY: string;
    UNLEASH_SERVER_URL: string;
    UNLEASH_INSTANCE_ID: string;
    UNLEASH_ENVIRONMENT: string;
    EBAY_CLIENT_ID: string;
    EBAY_CLIENT_SECRET: string;
    EBAY_REDIRECT_URL_NAME: string;
    EBAY_BASE_URL: string;
    EBAY_ENV: string;
    EBAY_SCOPES: string;
    FACEBOOK_APP_SECRET: string;
    FACEBOOK_APP_ID: string;
    FACEBOOK_API_URL: string;
    FRONTEND_SERVER_ADDRESS: string;
    NO_IMAGE_TEMPLATE_URL: string;
    AUTOTEST_PASSWORD: string;
  }
}

declare namespace Express {
  interface User {
    id: number;
  }
}

declare module 'ebay-oauth-nodejs-client' {
  export = any;
}
