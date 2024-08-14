package com.openmobilehub.reactnative.storage.core.extensions

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.openmobilehub.android.storage.core.model.OmhStorageEntity

fun  List<OmhStorageEntity>.toWritableArray(): WritableArray {
  val writableArray = Arguments.createArray()

  forEach {
    writableArray.pushMap(it.toWritableMap())
  }

  return writableArray
}
