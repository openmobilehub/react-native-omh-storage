package com.openmobilehub.reactnative.storage.dropbox

import com.facebook.react.bridge.ReactApplicationContext

class DropboxStorageModule internal constructor(context: ReactApplicationContext) :
  DropboxStorageSpec(context) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "DropboxStorage"
  }
}
