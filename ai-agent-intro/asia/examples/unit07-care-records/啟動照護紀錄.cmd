@echo off
chcp 65001 >nul
cd /d "%~dp0app"
where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8765
  py -m http.server 8765 --bind 127.0.0.1
  goto :eof
)
where python >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8765
  python -m http.server 8765 --bind 127.0.0.1
  goto :eof
)
echo 找不到 Python，請先安裝 Python 3，再重新執行本檔案。
pause

