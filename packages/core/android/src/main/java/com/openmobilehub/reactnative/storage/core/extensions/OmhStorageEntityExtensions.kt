package com.openmobilehub.reactnative.storage.core.extensions

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.openmobilehub.android.storage.core.model.OmhStorageEntity

fun OmhStorageEntity.toWritableMap(): WritableMap {
  val writableMap = Arguments.createMap()

  writableMap.apply {
    when (this@toWritableMap) {
      is OmhStorageEntity.OmhFile -> {
        putString("type", "file")
        putString("id", id)
        putString("name", name)
        createdTime?.let { putDouble("createdTime", it.time.toDouble()) }
        modifiedTime?.let { putDouble("modifiedTime", it.time.toDouble()) }
        parentId?.let { putString("parentId", it) }
        mimeType?.let { putString("mimeType", it) }
        extension?.let { putString("extension", it) }
        size?.let { putInt("size", it) }
      }

      is OmhStorageEntity.OmhFolder -> {
        putString("type", "folder")
        putString("id", id)
        putString("name", name)
        createdTime?.let { putDouble("createdTime", it.time.toDouble()) }
        modifiedTime?.let { putDouble("modifiedTime", it.time.toDouble()) }
        parentId?.let { putString("parentId", it) }
      }
    }
  }

  return writableMap
}
