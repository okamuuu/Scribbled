svn status | grep -E '^[M|A]' | sed -e 's/^[M|A]\s*//' | xargs svn diff
