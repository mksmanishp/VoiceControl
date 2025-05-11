package com.nativelocalstorage


import android.content.Context
import com.nativelocalstorage.NativeLocalStorageSpec
import com.facebook.react.bridge.ReactApplicationContext

class NativeLocalStorageModule(reactContext: ReactApplicationContext) : NativeLocalStorageSpec(reactContext) {

    companion object {
        const val NAME = "NativeLocalStorage"
        private const val PREF_NAME = "my_prefs"
    }

    override fun getName(): String {
        return NAME
    }

    override fun setItem(value: String, key: String) {
        val sharedPref = reactApplicationContext.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        sharedPref.edit().putString(key, value).apply()
    }

    override fun getItem(key: String): String? {
        val sharedPref = reactApplicationContext.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        return sharedPref.getString(key, null)
    }

    override fun removeItem(key: String) {
        val sharedPref = reactApplicationContext.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        sharedPref.edit().remove(key).apply()
    }

    override fun clear() {
        val sharedPref = reactApplicationContext.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        sharedPref.edit().clear().apply()
    }
}
