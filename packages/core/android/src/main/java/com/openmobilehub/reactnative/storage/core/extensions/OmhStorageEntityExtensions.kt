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
        putString("createdTime", createdTime.toString())
        putString("modifiedTime", modifiedTime.toString())
        putString("parentId", parentId)
        putString("mimeType", mimeType)
        putString("extension", extension)
        putInt("size", size ?: -1)
      }

      is OmhStorageEntity.OmhFolder -> {
        putString("type", "folder")
        putString("id", id)
        putString("name", name)
        putString("createdTime", createdTime.toString())
        putString("modifiedTime", modifiedTime.toString())
        putString("parentId", parentId)
      }
    }
  }

  return writableMap
}
