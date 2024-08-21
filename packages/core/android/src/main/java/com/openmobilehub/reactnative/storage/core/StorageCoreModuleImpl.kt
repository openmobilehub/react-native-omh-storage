package com.openmobilehub.reactnative.storage.core

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.model.OmhStorageException
import com.openmobilehub.reactnative.storage.core.extensions.toWritableArray
import com.openmobilehub.reactnative.storage.core.extensions.toWritableMap
import com.openmobilehub.reactnative.storage.core.utils.ErrorUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

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

  fun getFileMetadata(
    fileId: String,
    promise: Promise,
    stringifyOriginalMetadata: (Any) -> String
  ) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val metadata = storageClient.getFileMetadata(fileId)
          ?: throw Exception("File metadata not found")

        val writableMap = Arguments.createMap()
        writableMap.apply {
          putMap("entity", metadata.entity.toWritableMap())
          putString("originalMetadata", stringifyOriginalMetadata(metadata.originalMetadata))
        }

        promise.resolve(writableMap)
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }
}
