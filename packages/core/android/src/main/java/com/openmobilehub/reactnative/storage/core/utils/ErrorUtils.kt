package com.openmobilehub.reactnative.storage.core.utils

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.openmobilehub.android.storage.core.model.OmhStorageException

object ErrorUtils {
  fun createPayload(e: Exception): WritableMap {
    val payload = Arguments.createMap()

    when (e) {
      is OmhStorageException.ApiException -> {
        payload.putString("type", "ApiException")
        payload.putInt("statusCode", e.statusCode ?: -1)
        payload.putString("message", e.message)
      }

      is OmhStorageException.DeveloperErrorException -> {
        payload.putString("type", "DeveloperErrorException")
        payload.putString("message", e.message)
      }

      is OmhStorageException.InvalidCredentialsException -> {
        payload.putString("type", "InvalidCredentialsException")
        payload.putString("message", e.message)
      }

      is UnsupportedOperationException -> {
        payload.putString("type", "UnsupportedOperationException")
      }

      else -> {
        payload.putString("type", "UnknownException")
        payload.putString("message", e.message)
      }
    }

    return payload
  }
}
