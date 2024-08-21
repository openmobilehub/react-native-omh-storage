package com.openmobilehub.reactnative.storage.onedrive

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.model.OmhStorageException
import com.openmobilehub.android.storage.plugin.onedrive.OneDriveOmhStorageFactory
import com.openmobilehub.reactnative.auth.plugin.microsoft.OmhMicrosoftModule
import com.openmobilehub.reactnative.storage.core.StorageCoreModuleImpl

class StorageOneDriveModuleImpl(private val reactContext: ReactApplicationContext) {
  private val moduleImpl = StorageCoreModuleImpl(reactContext, this::createStorageClient)

  private fun createStorageClient(): OmhStorageClient {
    val module = reactContext.getNativeModule(OmhMicrosoftModule::class.java)
    val authClient = module?.authClient
      ?: throw OmhStorageException.DeveloperErrorException("OneDrive auth client is not initialized")
    val storageClient = OneDriveOmhStorageFactory().getStorageClient(authClient)

    return storageClient
  }

  fun initialize() {
    moduleImpl.initialize()
  }

  fun listFiles(folderId: String, promise: Promise) {
    moduleImpl.listFiles(folderId, promise)
  }

  fun downloadFile(folderId: String, promise: Promise) {
    moduleImpl.downloadFile(folderId, promise)
  }
  
  fun exportFile(folderId: String, mimeType: String, promise: Promise) {
    moduleImpl.exportFile(folderId, mimeType, promise)
  }

  companion object {
    const val NAME = "StorageOneDriveModule"
  }
}
