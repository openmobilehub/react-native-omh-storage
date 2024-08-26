package com.openmobilehub.reactnative.storage.core.extensions

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.openmobilehub.android.storage.core.model.OmhFileVersion
import com.openmobilehub.android.storage.core.model.OmhStorageEntity

fun OmhFileVersion.toWritableMap(): WritableMap {
  val writableMap = Arguments.createMap()

  writableMap.apply {
    putString("fileId", fileId)
    putString("versionId", versionId)
    putDouble("lastModified", lastModified.time.toDouble())
  }

  return writableMap
}
