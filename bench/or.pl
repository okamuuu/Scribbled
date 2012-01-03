#!/usr/bin/env perl
use strict;
use warnings;

use Benchmark qw/cmpthese timethese/;

my $count = 10_000_000;

cmpthese timethese $count, {
    or => sub {
        my $hoge = false() or return;
    },
    '||' => sub {
        my $hoge = false() || return;
    },
};

#bool() or false();
#bool() || false();

sub bool  { 
#    warn 'bool';
    return 1;
}

sub false { 
#    warn 'false';
    return 0; 
}
