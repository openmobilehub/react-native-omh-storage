package com.openmobilehub.reactnative.storage.googledrive

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RNOmhStorageGoogleModuleImpl.NAME)
class RNOmhStorageGoogleDriveModule(
  private val reactContext: ReactApplicationContext
) : NativeGoogleDriveStorageClientSpec(reactContext) {
  private val moduleImpl = RNOmhStorageGoogleModuleImpl(reactContext)

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
    const val NAME = RNOmhStorageGoogleModuleImpl.NAME
  }
}
