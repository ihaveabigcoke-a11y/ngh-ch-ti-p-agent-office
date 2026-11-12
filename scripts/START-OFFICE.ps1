# Mở văn phòng: Agent Office (máy chạy agent) + NosytLabs (màn hình pixel để xem).
#
# Lần đầu (cài NosytLabs và nối hook Claude/Codex vào nó):
#   powershell -ExecutionPolicy Bypass -File scripts\START-OFFICE.ps1 -Setup
# Những lần sau:
#   powershell -ExecutionPolicy Bypass -File scripts\START-OFFICE.ps1
#
# Script không xoá và không ghi đè cấu hình của bạn. Nếu ~/.claude/settings.json đang lỗi JSON,
# script chỉ báo, bỏ qua Claude và vẫn nối Codex.

param([switch]$Setup)
$ErrorActionPreference = 'Stop'

$Tools  = 'D:\agent-office\tools'
$Nosyt  = Join-Path $Tools 'nosyt-agent-office'
$Commit = 'df6551d8e415d711b0fde790d33da09e77a63563'   # NosytLabs/agent-office, ghim ngày 10/11/2026

function Need($cmd, $hint) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { throw "Thiếu '$cmd'. $hint" }
}
Need git 'Cài Git: winget install --id Git.Git -e'
Need py 'Cài Python 3.10+: winget install --id Python.Python.3.12 -e'
Need agent-office 'Cài Agent Office theo docs/SETUP-WINDOWS.md'

if ($Setup -or -not (Test-Path $Nosyt)) {
  New-Item -ItemType Directory -Force -Path $Tools | Out-Null
  if (-not (Test-Path $Nosyt)) {
    git clone https://github.com/NosytLabs/agent-office.git $Nosyt
  }
  git -C $Nosyt fetch --quiet origin $Commit
  git -C $Nosyt -c advice.detachedHead=false checkout --quiet $Commit

  $runtimes = @('codex')
  $claudeSettings = Join-Path $env:USERPROFILE '.claude\settings.json'
  $claudeOk = $true
  if (Test-Path $claudeSettings) {
    try { Get-Content -Raw $claudeSettings | ConvertFrom-Json | Out-Null }
    catch { $claudeOk = $false }
  }
  if ($claudeOk) { $runtimes += 'claude' }
  else {
    Write-Warning "$claudeSettings đang lỗi JSON (có thể sót dấu phẩy). Sửa file đó rồi chạy lại với -Setup để nối Claude. Lần này chỉ nối Codex."
  }

  Push-Location $Nosyt
  try {
    Write-Host '==> Xem trước những gì sẽ được nối (chưa thay đổi gì):'
    py -3 install.py --dry-run
    Write-Host "==> Nối: $($runtimes -join ', ')"
    py -3 install.py --only @runtimes
  } finally { Pop-Location }

  Write-Host ''
  Write-Host '!! Codex: mở codex một lần, gõ /hooks và chấp nhận hook của Agent Office (NosytLabs).'
  Write-Host '!! Claude Code: tắt và mở lại các phiên đang chạy để nhận hook mới.'
}

# Máy chạy agent: boss Claude thuê worker Codex ở đây. Không cần nhìn, có thể thu nhỏ cửa sổ.
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'agent-office --no-open' -WindowStyle Minimized

# Màn hình theo dõi.
Start-Process powershell -ArgumentList '-NoExit', '-Command', "Set-Location '$Nosyt'; py -3 run.py" -WindowStyle Minimized
Start-Sleep -Seconds 4
Start-Process 'http://127.0.0.1:8113'

Write-Host ''
Write-Host 'Màn hình theo dõi (NosytLabs): http://127.0.0.1:8113'
Write-Host 'Nơi giao việc cho boss (Agent Office): http://localhost:4600   (điện thoại: /lite)'
