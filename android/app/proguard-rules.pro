
# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.

# Keep Facebook SDK classes
-keep class com.facebook.** { *; }
-dontwarn com.facebook.**

# Keep Google Play Services
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

# Keep Capacitor classes
-keep class com.getcapacitor.** { *; }
-dontwarn com.getcapacitor.**

# Keep app-specific classes
-keep class app.lovable.fc31d0ad638c49a5b87ccb67b53f98e1.** { *; }

# Keep JSON serialization classes
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

# Keep WebView JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# General Android optimizations
-optimizationpasses 5
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-dontpreverify
-verbose
