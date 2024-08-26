package com.openmobilehub.reactnative.storage.core.extensions

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.openmobilehub.android.storage.core.model.OmhIdentity
import com.openmobilehub.android.storage.core.model.OmhPermission
import com.openmobilehub.android.storage.core.model.OmhPermissionRole
import com.openmobilehub.android.storage.core.model.OmhStorageEntity
import java.util.Date

fun OmhPermission.toWritableMap(): WritableMap {
  val writableMap = Arguments.createMap()

  writableMap.apply {
    when (val permission = this@toWritableMap) {
      is OmhPermission.IdentityPermission -> {
        putString("type", permission.identity.getTypeNativeString())
        putString("id", permission.id)
        putString("role", permission.role.getRoleNativeString())
        permission.isInherited?.let { putBoolean("isInherited", it) }


        when (val identity = permission.identity) {
          OmhIdentity.Anyone -> {
            // ignore, no extra fields
          }

          is OmhIdentity.Application -> {
            putString("applicationId", identity.id)
            putString("displayName", identity.displayName)
            putExpirationTime(identity.expirationTime)
          }

          is OmhIdentity.Device -> {
            putString("deviceId", identity.id)
            putString("displayName", identity.displayName)
            putExpirationTime(identity.expirationTime)
          }

          is OmhIdentity.Domain -> {
            putString("displayName", identity.displayName)
            putString("domain", identity.domain)
          }

          is OmhIdentity.Group -> {
            putString("groupId", identity.id)
            putString("displayName", identity.displayName)
            putString("emailAddress", identity.emailAddress)
            putExpirationTime(identity.expirationTime)
            identity.deleted?.let { putBoolean("deleted", it) }
          }

          is OmhIdentity.User -> {
            putString("userId", identity.id)
            putString("displayName", identity.displayName)
            putString("emailAddress", identity.emailAddress)
            putExpirationTime(identity.expirationTime)
            identity.deleted?.let { putBoolean("deleted", it) }
            putString("photoLink", identity.photoLink)
            identity.pendingOwner?.let { putBoolean("pendingOwner", it) }
          }
        }
      }
    }
  }

  return writableMap
}

private fun WritableMap.putExpirationTime(date: Date?) {
  date?.let { putDouble("expirationTime", it.time.toDouble()) }
}

private fun OmhIdentity.getTypeNativeString(): String = when (this) {
  OmhIdentity.Anyone -> "anyone"
  is OmhIdentity.Application -> "application"
  is OmhIdentity.Device -> "device"
  is OmhIdentity.Domain -> "domain"
  is OmhIdentity.Group -> "group"
  is OmhIdentity.User -> "user"
}

private fun OmhPermissionRole.getRoleNativeString(): String = when (this) {
  OmhPermissionRole.OWNER -> "owner"
  OmhPermissionRole.WRITER -> "writer"
  OmhPermissionRole.COMMENTER -> "commenter"
  OmhPermissionRole.READER -> "reader"
}

