package com.openmobilehub.reactnative.storage.googledrive

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableArray

class GoogleDriveModule internal constructor(context: ReactApplicationContext) :
  GoogleDriveSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun listFiles(promise: Promise) {
    val filesArray = arrayOf("file1", "file2")

    val writableArray = Arguments.createArray()
    for (file in filesArray) {
      writableArray.pushString(file)
    }

    promise.resolve(writableArray)
  }

  companion object {
    const val NAME = "GoogleDrive"
  }
}
