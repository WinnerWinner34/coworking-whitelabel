@echo off
REM Dual Repository Push Script for Windows
REM Pushes to both PersonalRepo and WorkRepo branches

setlocal enabledelayedexpansion

REM Branch variables
set PersonalRepo=WorkingWebsiteV2
set WorkRepo=ubitracks-whitelabel-webapps

echo.
echo 🚀 Dual Repository Push Script
echo.

REM Function to push to a branch
call :push_to_branch "%PersonalRepo%" "Personal Repo"
if errorlevel 1 exit /b 1

call :push_to_branch "%WorkRepo%" "Work Repo"
if errorlevel 1 exit /b 1

echo.
echo 🎉 All pushes completed successfully!
echo Personal Repo: https://github.com/WinnerWinner34/coworking-whitelabel/tree/%PersonalRepo%
echo Work Repo: https://github.com/WinnerWinner34/coworking-whitelabel/tree/%WorkRepo%
pause
exit /b 0

:push_to_branch
set branch_name=%~1
set repo_type=%~2

echo.
echo === PUSHING TO %repo_type% ===
echo 📁 Switching to branch: %branch_name%

REM Check if branch exists
git show-ref --verify --quiet refs/heads/%branch_name%
if errorlevel 1 (
    echo ❌ Error: Branch '%branch_name%' does not exist!
    echo Please create the branch first or check the branch name.
    exit /b 1
)

REM Switch to branch
git checkout %branch_name%
if errorlevel 1 (
    echo ❌ Error: Failed to switch to branch '%branch_name%'
    exit /b 1
)

echo 📦 Adding all changes...
git add .
if errorlevel 1 (
    echo ❌ Error: Failed to add changes
    exit /b 1
)

echo 💬 Enter commit message for %repo_type%:
set /p commit_message=Commit message: 

echo 💾 Committing changes...
git commit -m "%commit_message%"
if errorlevel 1 (
    echo ❌ Error: Failed to commit changes
    exit /b 1
)

echo 🌐 Pushing to origin/%branch_name%...
git push -u origin %branch_name%
if errorlevel 1 (
    echo ❌ Error: Failed to push to remote
    exit /b 1
)

echo ✅ Successfully pushed to %branch_name%
echo.
exit /b 0