package com.openmobilehub.reactnative.storage.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableArray

class CoreModule internal constructor(context: ReactApplicationContext) :
  CoreSpec(context) {

  override fun getName(): String {
    return NAME
  }

  // TODO: POC, remove once implemented
  @ReactMethod
  override fun listFiles(promise: Promise) {
    val filesArray = arrayOf("file2", "file1")

    val writableArray = Arguments.createArray()
    for (file in filesArray) {
      writableArray.pushString(file)
    }

    promise.resolve(writableArray)
  }

  companion object {
    const val NAME = "RNOmhStorageModule"
  }
}
