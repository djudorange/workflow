
$SNAPSHOT_DIRECTORY="packages/workflow-core/test/integration/__image_snapshots__"
$BRANCH_PREFIX="update-snapshot"

# Exit early if there are no changes in the snapshot directory
if ($(git status $SNAPSHOT_DIRECTORY -s) -eq $null) {
  echo "No snapshots to update"
  exit 0
}

# Determine branch names
$CURRENT_BRANCH="$env:APPVEYOR_REPO_BRANCH"

if ($CURRENT_BRANCH.startsWith($BRANCH_PREFIX)) {
  echo "The branch is a snapshot update generated by a script"
  echo "This usually occurs due to a bug in the script"
  echo "Exiting to avoid infinite build"
  exit 0
}

# Enable Credentials Store
git config --global credential.helper store

# Setup git credentials
git config --global user.email "team@appveyor.com"
git config --global user.name "AppVeyor CI"

# Setup token based credentials
Add-Content "$HOME\.git-credentials" "https://$($env:access_token):x-oauth-basic@github.com`n"

# Save state (restored at the end of the script)
git stash -u

$SNAPSHOT_BRANCH="$BRANCH_PREFIX/appveyor-$env:APPVEYOR_BUILD_ID/$CURRENT_BRANCH"

# Create branch
git checkout -b $SNAPSHOT_BRANCH

# Run integration tests and update new snapshots
yarn jest -u integration --forceExit

# Setup github remote
git remote set-url origin https://github.com/havardh/workflow.git

# Commit and push the updated snapshots to origin
git add $SNAPSHOT_DIRECTORY/*
git commit -m @'
test: update snapshot for windows

This commit was generated by /Script/appveyor-update-snapshot
'@
git push -u origin $SNAPSHOT_BRANCH

# Restore state from before execution of this script
git checkout $CURRENT_BRANCH
git stash pop
