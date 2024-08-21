package com.openmobilehub.reactnative.storage.dropbox

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.model.OmhStorageException
import com.openmobilehub.android.storage.plugin.dropbox.DropboxOmhStorageFactory
import com.openmobilehub.reactnative.auth.plugin.dropbox.OmhDropboxModule
import com.openmobilehub.reactnative.storage.core.StorageCoreModuleImpl

class StorageDropboxModuleImpl(private val reactContext: ReactApplicationContext) {
  private val moduleImpl = StorageCoreModuleImpl(reactContext, this::createStorageClient)

  private fun createStorageClient(): OmhStorageClient {
    val module = reactContext.getNativeModule(OmhDropboxModule::class.java)
    val authClient = module?.authClient
      ?: throw OmhStorageException.DeveloperErrorException("Dropbox auth client is not initialized")
    val storageClient = DropboxOmhStorageFactory().getStorageClient(authClient)

    return storageClient
  }

  fun initialize() {
    moduleImpl.initialize()
  }

  fun listFiles(folderId: String, promise: Promise) {
    moduleImpl.listFiles(folderId, promise)
  }

  fun getFileMetadata(fileId: String, promise: Promise) {
    moduleImpl.getFileMetadata(fileId, promise) {
      it.toString()
    }
  }

  companion object {
    const val NAME = "StorageDropboxModule"
  }
}
