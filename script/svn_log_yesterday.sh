SUBTRACT=1
if (($#>0)); then
    SUBTRACT=$1
fi
DAY=`perl -MDateTime -le "print+(DateTime->now()->subtract(days=>$SUBTRACT)->ymd())"`
svn -r {$DAY}:HEAD log
