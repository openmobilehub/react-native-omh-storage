import {
  AndroidAuthConfig,
  IAuthModule,
  IOSAuthConfig,
  PlatformAuthConfig,
} from '@openmobilehub/auth-core';

export type AuthProvider = IAuthModule<
  PlatformAuthConfig<AndroidAuthConfig, IOSAuthConfig>
>;
