FILES=$(find . -name $1)
for file in $FILES
do
    echo ${file}
done

echo 'svn del ok? [y/n]'

read ANS
if [ $ANS = 'y' -o $ANS = 'yes' ]; then
echo $FILES
fi
