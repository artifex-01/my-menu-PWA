@echo off
echo ==========================================
echo       MY MENU - ANDROID BUILD SCRIPT
echo ==========================================

echo.
echo [1/3] Building Web Assets (Vite)...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Web build failed.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Syncing Capacitor with Android...
call npx cap sync
if %errorlevel% neq 0 (
    echo Error: Capacitor sync failed.
    pause
    exit /b %errorlevel%
)

echo.
echo [3/3] Building Android APK (Gradle)...
cd android
call gradlew.bat clean
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo Error: Gradle build failed.
    pause
    exit /b %errorlevel%
)

echo.
echo ==========================================
echo           BUILD SUCCESSFUL!
echo ==========================================
echo.
echo Your APK is ready at:
echo android\app\build\outputs\apk\debug\app-debug.apk
echo.
pause
