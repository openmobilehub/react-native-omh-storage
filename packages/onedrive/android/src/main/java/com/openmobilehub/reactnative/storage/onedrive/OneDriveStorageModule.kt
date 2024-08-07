package com.openmobilehub.reactnative.storage.onedrive

import com.facebook.react.bridge.ReactApplicationContext

class OneDriveStorageModule internal constructor(context: ReactApplicationContext) :
  OneDriveStorageSpec(context) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "OneDriveStorage"
  }
}
