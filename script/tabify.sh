perl -i.bak -ple 's{^([ ]+)}{"\t" x (length($1)/4)}e' $@
#perl -ple 's{^([ ]+)}{"\t" x (length($1)/4)}e' $@
