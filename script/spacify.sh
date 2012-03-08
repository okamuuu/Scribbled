perl -i.bak -ple 's{^(\t+)}{q( ) x (length($1)*4)}e' $@
