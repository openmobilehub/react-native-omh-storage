import {
  AndroidAuthConfig,
  IAuthModule,
  IOSAuthConfig,
  PlatformAuthConfig,
} from '@openmobilehub/auth-core';

export type AuthClient = IAuthModule<
  PlatformAuthConfig<AndroidAuthConfig, IOSAuthConfig>
>;
