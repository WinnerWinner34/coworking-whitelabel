@echo off
REM Coworking Platform - Dual Git Push
REM Pushes to both Personal and Work repositories

echo ========================================
echo  Coworking Platform - Dual Git Push
echo ========================================
echo.

REM Check if this folder is already connected to git
if not exist .git (
    echo ERROR: This folder is not a git repository!
    echo Please run 'git init' first.
    echo.
    pause
    exit /b 1
)

REM Set up remotes for both repositories
REM Check for personal remote connection
git remote get-url personal >nul 2>&1
if errorlevel 1 (
    echo Adding connection to personal GitHub repository...
    git remote add personal https://github.com/WinnerWinner34/coworking-whitelabel.git
)

REM Check for work remote connection  
git remote get-url work >nul 2>&1
if errorlevel 1 (
    echo Adding connection to work GitHub repository...
    git remote add work https://github.com/Ubitracks/ubitracks-whitelabel-webapps.git
)

echo.
echo Current remotes:
git remote -v
echo.

REM Ask user for a commit message
set /p commit_message="Enter commit message: "
if "%commit_message%"=="" set commit_message="Update coworking platform"

echo.
echo ========================================
echo  Staging and Committing Changes
echo ========================================

REM Stage all changes
git add .

REM Save changes to local git history
git commit -m "%commit_message%"

echo.
echo ========================================
echo  Pushing to Personal GitHub (FIRST)
echo ========================================
REM Switch to personal branch and push
git checkout WorkingWebsiteV2
git push personal WorkingWebsiteV2
if errorlevel 1 (
    echo Trying to push to personal with -u flag...
    git push -u personal WorkingWebsiteV2
)

echo.
echo ========================================
echo  Pushing to Work GitHub (SECOND)
echo ========================================
REM Switch to work branch and push
git checkout ubitracks-whitelabel-webapps
git push work ubitracks-whitelabel-webapps
if errorlevel 1 (
    echo Trying to push to work with -u flag...
    git push -u work ubitracks-whitelabel-webapps
)

echo.
echo ========================================
echo  Push Complete!
echo ========================================
echo Personal: https://github.com/WinnerWinner34/coworking-whitelabel/tree/WorkingWebsiteV2
echo Work:     https://github.com/Ubitracks/ubitracks-whitelabel-webapps/tree/ubitracks-whitelabel-webapps
echo.
pause