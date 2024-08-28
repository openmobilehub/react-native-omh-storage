package com.openmobilehub.reactnative.storage.core.mappers

import com.openmobilehub.android.storage.core.model.OmhCreatePermission
import com.openmobilehub.android.storage.core.model.OmhPermissionRecipient
import com.openmobilehub.android.storage.core.model.OmhPermissionRole

fun mapToCreatePermission(
  role: String,
  recipientType: String,
  recipientEmail: String?,
  recipientDomain: String?,
  recipientObjectId: String?,
  recipientAlias: String?,
): OmhCreatePermission {
  return OmhCreatePermission.CreateIdentityPermission(
    mapStringToRole(role),
    mapToPermissionRecipient(
      recipientType,
      recipientEmail,
      recipientDomain,
      recipientObjectId,
      recipientAlias
    )
  )
}

fun mapToPermissionRecipient(
  type: String,
  email: String?,
  domain: String?,
  objectId: String?,
  alias: String?,
): OmhPermissionRecipient {
  return when (type) {
    "user" -> OmhPermissionRecipient.User(requireNotNull(email))
    "group" -> OmhPermissionRecipient.Group(requireNotNull(email))
    "domain" -> OmhPermissionRecipient.Domain(requireNotNull(domain))
    "anyone" -> OmhPermissionRecipient.Anyone
    "objectId" -> OmhPermissionRecipient.WithObjectId(requireNotNull(objectId))
    "alias" -> OmhPermissionRecipient.WithAlias(requireNotNull(alias))
    else -> throw IllegalArgumentException("Invalid permission recipient type")
  }
}

fun mapStringToRole(string: String): OmhPermissionRole {
  return when (string) {
    "owner" -> OmhPermissionRole.OWNER
    "writer" -> OmhPermissionRole.WRITER
    "commenter" -> OmhPermissionRole.COMMENTER
    "reader" -> OmhPermissionRole.READER
    else -> throw IllegalArgumentException("Invalid permission role")
  }
}
