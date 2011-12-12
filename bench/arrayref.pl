#!/usr/bin/env perl
use strict;
use warnings;
use Benchmark qw/cmpthese timethese/;

my $COUNT = 100_000;
my @array = (1,2,3,4,5);

cmpthese timethese $COUNT, {
    contain_anonymous_ref => sub {
        [@array];
    },

    get_ref => sub { 
        \@array;
    },
};

