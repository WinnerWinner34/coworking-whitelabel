@echo off
REM Coworking Platform - Dual Git Push
REM Pushes to both Personal and Work repositories

REM Branch name variables
set PersonalBranch=WorkingWebsiteV2
set WorkBranch=WorkingWebsiteV2-Ubi

echo ========================================
echo  Coworking Platform - Dual Git Push
echo ========================================
echo Personal Branch: %PersonalBranch%
echo Work Branch: %WorkBranch%
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
REM Push current branch to personal remote with PersonalBranch name
git push personal HEAD:%PersonalBranch%
if errorlevel 1 (
    echo Trying to push to personal with -u flag...
    git push -u personal HEAD:%PersonalBranch%
)

echo.
echo ========================================
echo  Pushing to Work GitHub (SECOND)
echo ========================================
REM Push current branch to work remote with WorkBranch name
git push work HEAD:%WorkBranch%
if errorlevel 1 (
    echo Trying to push to work with -u flag...
    git push -u work HEAD:%WorkBranch%
)

echo.
echo ========================================
echo  Push Complete!
echo ========================================
echo Personal: https://github.com/WinnerWinner34/coworking-whitelabel/tree/%PersonalBranch%
echo Work:     https://github.com/Ubitracks/ubitracks-whitelabel-webapps/tree/%WorkBranch%
echo.
pause