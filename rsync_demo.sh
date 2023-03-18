#/bin/bash
rsync -vr --delete --copy-links --exclude-from=rsync_exclude ./ root@xpress:/var/www/demo/
