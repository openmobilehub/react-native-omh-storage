package com.openmobilehub.reactnative.storage.googledrive

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.OmhStorageProvider
import com.openmobilehub.reactnative.auth.plugin.google.OmhGoogleModule
import com.openmobilehub.reactnative.storage.core.StorageModuleImpl
import com.openmobilehub.android.storage.plugin.googledrive.gms.GoogleDriveGmsConstants
import com.openmobilehub.android.storage.plugin.googledrive.nongms.GoogleDriveNonGmsConstants


class RNOmhStorageGoogleModuleImpl(private val reactContext: ReactApplicationContext) {
  private val moduleImpl = StorageModuleImpl(reactContext, this::createStorageClient)

  private fun createStorageClient(): OmhStorageClient {
    val module = reactContext.getNativeModule(OmhGoogleModule::class.java)
    val authClient = module?.authClient
    val storageClient = OmhStorageProvider.Builder()
      .addGmsPath(GoogleDriveGmsConstants.IMPLEMENTATION_PATH)
      .addNonGmsPath(GoogleDriveNonGmsConstants.IMPLEMENTATION_PATH)
      .build()
      .provideStorageClient(authClient!!, reactContext)

    return storageClient
  }

  fun initialize() {
    moduleImpl.initialize()
  }

  fun listFiles(folderId: String, promise: Promise) {
    moduleImpl.listFiles(folderId, promise)
  }

  companion object {
    const val NAME = "RNOmhStorageGoogleDriveModule"
  }
}
