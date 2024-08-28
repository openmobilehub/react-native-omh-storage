package com.openmobilehub.reactnative.storage.core

import com.facebook.react.bridge.Arguments
import android.net.Uri
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.openmobilehub.android.storage.core.OmhStorageClient
import com.openmobilehub.android.storage.core.model.OmhStorageException
import com.openmobilehub.reactnative.storage.core.extensions.toWritableFileVersionArray
import com.openmobilehub.reactnative.storage.core.extensions.toWritableMap
import com.openmobilehub.reactnative.storage.core.extensions.toWritablePermissionArray
import com.openmobilehub.reactnative.storage.core.extensions.toWritableStorageEntityArray
import com.openmobilehub.reactnative.storage.core.mappers.mapStringToRole
import com.openmobilehub.reactnative.storage.core.mappers.mapToCreatePermission
import com.openmobilehub.reactnative.storage.core.utils.ErrorUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.File
import java.io.FileOutputStream

class StorageCoreModuleImpl(
  private val context: ReactApplicationContext,
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
        val files = storageClient.listFiles(folderId)
        promise.resolve(files.toWritableStorageEntityArray())
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

  fun uploadFile(fileName: String, uri: String, folderId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      val file = getFile(Uri.parse(uri), fileName)
      try {
        val uploadedFile = storageClient.uploadFile(file, folderId)
        promise.resolve(uploadedFile?.toWritableMap())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      } finally {
        file.delete()
      }
    }
  }

  fun updateFile(fileName: String, uri: String, fileId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      val file = getFile(Uri.parse(uri), fileName)
      try {
        val updatedFile = storageClient.updateFile(file, fileId)
        promise.resolve(updatedFile?.toWritableMap())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      } finally {
        file.delete()
      }
    }
  }

  private fun getFile(uri: Uri, fileName: String): File {
    val omhCacheDir = File(context.cacheDir, "omh-storage")
    if (!omhCacheDir.exists()) {
      omhCacheDir.mkdirs()
    }
    val tempFile = File(omhCacheDir, fileName)

    context.contentResolver.openInputStream(uri)?.use { inputStream ->
      tempFile.outputStream().use { output ->
        inputStream.copyTo(output)
      }
    }

    return tempFile
  }

  fun search(query: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val files = storageClient.search(query)
        promise.resolve(files.toWritableStorageEntityArray())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun downloadFile(fileId: String, filePath: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val byteArrayOutputStream = storageClient.downloadFile(fileId)

        writeToFile(filePath, byteArrayOutputStream.toByteArray())

        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun exportFile(fileId: String, mimeType: String, filePath: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val byteArrayOutputStream = storageClient.exportFile(fileId, mimeType)

        writeToFile(filePath, byteArrayOutputStream.toByteArray())

        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun getFileVersions(fileId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val fileVersions = storageClient.getFileVersions(fileId)
        promise.resolve(fileVersions.toWritableFileVersionArray())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun downloadFileVersion(fileId: String, versionId: String, filePath: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val byteArrayOutputStream = storageClient.downloadFileVersion(fileId, versionId)

        writeToFile(filePath, byteArrayOutputStream.toByteArray())

        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun createFileWithMimeType(name: String, mimeType: String, parentId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val file = storageClient.createFileWithMimeType(name, mimeType, parentId)

        promise.resolve(file?.toWritableMap())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun createFileWithExtension(
    name: String,
    fileExtension: String,
    parentId: String,
    promise: Promise
  ) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val file = storageClient.createFileWithExtension(name, fileExtension, parentId)

        promise.resolve(file?.toWritableMap())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun createFolder(name: String, parentId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val file = storageClient.createFolder(name, parentId)

        promise.resolve(file?.toWritableMap())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun getPermissions(fileId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val permissions = storageClient.getFilePermissions(fileId)
        promise.resolve(permissions.toWritablePermissionArray())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun getWebUrl(fileId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val webUrl = storageClient.getWebUrl(fileId)
        promise.resolve(webUrl)
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun createPermission(
    fileId: String,
    role: String,
    sendNotificationEmail: Boolean,
    recipientType: String,
    emailMessage: String?,
    recipientEmail: String?,
    recipientDomain: String?,
    recipientObjectId: String?,
    recipientAlias: String?,
    promise: Promise
  ) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val permission = storageClient.createPermission(
          fileId,
          mapToCreatePermission(
            role,
            recipientType,
            recipientEmail,
            recipientDomain,
            recipientObjectId,
            recipientAlias,
          ),
          sendNotificationEmail,
          emailMessage
        )
        promise.resolve(permission?.toWritableMap())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun deletePermission(fileId: String, permissionId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        storageClient.deletePermission(fileId, permissionId)
        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun updatePermission(fileId: String, permissionId: String, role: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        val permission = storageClient.updatePermission(fileId, permissionId, mapStringToRole(role))
        promise.resolve(permission?.toWritableMap())
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun deleteFile(fileId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        storageClient.deleteFile(fileId)
        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  fun permanentlyDeleteFile(fileId: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      try {
        storageClient.permanentlyDeleteFile(fileId)
        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject(e, ErrorUtils.createPayload(e))
      }
    }
  }

  private fun writeToFile(filePath: String, bytes: ByteArray) {
    val file = File(filePath)

    FileOutputStream(file).use { fileOutputStream ->
      fileOutputStream.write(bytes)
    }
  }
}
