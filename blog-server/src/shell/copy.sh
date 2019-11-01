#! bin/sh
cd /Users/ifudata/Documents/test/nodeJS/blog-server/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log