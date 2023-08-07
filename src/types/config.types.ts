export interface CalendarConfig {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
  universe_domain: string
  scopes: string[] | string
  calender: {
    primary: string
    secondary: string
  }
}
export interface OAuthConfig {
  clientId: string
  clientSecret: string
  redirectUrl: string
  api_key: string
  token: {
    refresh_token: string
    access_token: string
  }
}
