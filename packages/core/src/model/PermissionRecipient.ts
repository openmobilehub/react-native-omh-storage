export type PermissionRecipient =
  | UserRecipient
  | GroupRecipient
  | DomainRecipient
  | AnyoneRecipient
  | ObjectIdRecipient
  | AliasRecipient;

export type UserRecipient = {
  type: 'user';
  email: string;
};

export type GroupRecipient = {
  type: 'group';
  email: string;
};

export type DomainRecipient = {
  type: 'domain';
  domain: string;
};

export type AnyoneRecipient = {
  type: 'anyone';
};

export type ObjectIdRecipient = {
  type: 'objectId';
  objectId: string;
};

export type AliasRecipient = {
  type: 'alias';
  alias: string;
};
