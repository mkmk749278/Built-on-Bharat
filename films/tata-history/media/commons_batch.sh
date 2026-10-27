#!/bin/bash
# Run every row of commons_batch.tsv through scripts/commons_html_fetch.py (resumable: files already in the manifest are skipped).
cd /home/user/Built-on-Bharat
grep -v '^#' films/tata-history/media/commons_batch.tsv | while IFS=$'\t' read -r id q n must; do
  [ -z "$id" ] && continue
  echo "== $id $q"
  if [ -n "$must" ]; then python3 scripts/commons_html_fetch.py films/tata-history/assets/media/raw/wm "$id" "$q" --n "$n" --must "$must"
  else python3 scripts/commons_html_fetch.py films/tata-history/assets/media/raw/wm "$id" "$q" --n "$n"; fi
  sleep 5
done
echo BATCH DONE
