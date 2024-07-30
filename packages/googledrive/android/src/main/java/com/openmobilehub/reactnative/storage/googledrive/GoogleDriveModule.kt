package com.openmobilehub.reactnative.storage.googledrive

import com.facebook.react.bridge.ReactApplicationContext

class GoogleDriveModule internal constructor(context: ReactApplicationContext) :
  GoogleDriveSpec(context) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "GoogleDrive"
  }
}
