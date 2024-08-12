package com.openmobilehub.reactnative.storage.dropbox

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhStorageDropboxModule.NAME)
class RNOmhStorageDropboxModule(
  private val reactContext: ReactApplicationContext
) : NativeDropboxStorageClientSpec(reactContext) {
  private val moduleImpl = RNOmhStorageDropboxModuleImpl(reactContext)

  @ReactMethod
  override fun initializeStorageClient() {
    return moduleImpl.initialize()
  }

  @ReactMethod
  override fun listFiles(folderId: String, promise: Promise) {
    return moduleImpl.listFiles(folderId, promise)
  }

  override fun getName() = NAME

  companion object {
    const val NAME = RNOmhStorageDropboxModuleImpl.NAME
  }
}
