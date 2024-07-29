package com.openmobilehub.reactnative.storage.core

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class CoreModule internal constructor(context: ReactApplicationContext) :
  CoreSpec(context) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "Core"
  }
}
