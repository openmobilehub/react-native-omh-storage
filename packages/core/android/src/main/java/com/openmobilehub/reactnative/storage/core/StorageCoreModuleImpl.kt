package com.openmobilehub.reactnative.storage.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.model.OmhStorageException
import com.openmobilehub.reactnative.storage.core.extensions.toWritableArray
import com.openmobilehub.reactnative.storage.core.utils.ErrorUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import android.util.Base64

class StorageCoreModuleImpl(
  context: ReactApplicationContext,
  private val createStorageClient: () -> OmhStorageClient
) {
  private var _storageClient: OmhStorageClient? = null
  private val storageClient: OmhStorageClient
    get() = _storageClient
      ?: throw OmhStorageException.DeveloperErrorException("OmhStorageClient is not yet initialized")

  fun initialize() {
    _storageClient = createStorageClient()
  }

  fun listFiles(folderId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val files = storageClient.listFiles(parentId = folderId)
        promise.resolve(files.toWritableArray())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun downloadFile(fileId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val file = storageClient.downloadFile(fileId)
        val base64 = Base64.encodeToString(file.toByteArray(), Base64.NO_WRAP)

        promise.resolve(base64)
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }
}
