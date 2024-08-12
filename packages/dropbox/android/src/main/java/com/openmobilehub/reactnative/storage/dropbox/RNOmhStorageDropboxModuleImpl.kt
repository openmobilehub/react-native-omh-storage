package com.openmobilehub.reactnative.storage.dropbox

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.plugin.dropbox.DropboxOmhStorageFactory
import com.openmobilehub.reactnative.auth.plugin.dropbox.OmhDropboxModule
import com.openmobilehub.reactnative.storage.core.StorageModuleImpl


class RNOmhStorageDropboxModuleImpl(private val reactContext: ReactApplicationContext) {
  private val moduleImpl = StorageModuleImpl(reactContext, this::createStorageClient)

  private fun createStorageClient(): OmhStorageClient {
    val module = reactContext.getNativeModule(OmhDropboxModule::class.java)
    val authClient = module?.authClient
    val storageClient = DropboxOmhStorageFactory().getStorageClient(authClient!!)
    return storageClient
  }

  fun initialize() {
    moduleImpl.initialize()
  }

  fun listFiles(folderId: String, promise: Promise) {
    moduleImpl.listFiles(folderId, promise)
  }

  companion object {
    const val NAME = "RNOmhStorageDropboxModule"
  }
}
