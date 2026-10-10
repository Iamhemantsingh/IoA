$git = Join-Path $env:LOCALAPPDATA 'Programs\MinGit\cmd\git.exe'

Write-Host "--- Git Init ---"
& $git init

Write-Host "--- Git Config User if not set ---"
$userName = & $git config user.name
if (-not $userName) {
    & $git config user.name "Hemant Singh"
    & $git config user.email "hemant@example.com"
}

Write-Host "--- Git Add . ---"
& $git add .

Write-Host "--- Git Commit ---"
& $git commit -m "Initial commit of Institute of Archaeology portal"

Write-Host "--- Git Branch -M main ---"
& $git branch -M main

Write-Host "--- Git Remote Add Origin ---"
$remoteUrl = "https://github.com/Iamhemantsingh/IoA.git"
$existingRemotes = & $git remote
if ($existingRemotes -contains "origin") {
    & $git remote set-url origin $remoteUrl
} else {
    & $git remote add origin $remoteUrl
}

Write-Host "--- Git Push ---"
& $git push -u origin main
