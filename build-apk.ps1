# Everything Coffee - Android APK Build Script (PowerShell)
# This script automates the APK build process on Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Everything Coffee - Android APK Builder" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js v14 or higher." -ForegroundColor Red
    exit 1
}

# Check npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed." -ForegroundColor Red
    exit 1
}

# Check Java
try {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    Write-Host "✅ Java installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Java is not installed. Please install JDK 11 or higher." -ForegroundColor Red
    exit 1
}

# Check Android SDK
if (-not $env:ANDROID_HOME -and -not $env:ANDROID_SDK_ROOT) {
    Write-Host "⚠️  Warning: ANDROID_HOME or ANDROID_SDK_ROOT not set" -ForegroundColor Yellow
    Write-Host "    Please set the environment variable before proceeding." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "Step 1: Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps

Write-Host ""
Write-Host "Step 2: Building Angular application..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "Step 3: Syncing with Capacitor..." -ForegroundColor Yellow
npm run capsync

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Build preparation complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "1. Open Android Studio: npx capacitor open android" -ForegroundColor White
Write-Host "2. Go to: Build > Generate Signed Bundle/APK" -ForegroundColor White
Write-Host "3. Select APK and follow the wizard" -ForegroundColor White
Write-Host ""
Write-Host "The APK will be at: android/app/release/app-release.apk" -ForegroundColor Cyan
Write-Host ""
