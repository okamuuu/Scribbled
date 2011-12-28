#!/usr/bin/env perl
use strict;
use warnings;
use 5.010001;

use Benchmark qw/cmpthese timethese/;

my $count = 10_000_000;

my ( $j, $k ) = ( 1, 2 );

cmpthese timethese $count, {

    'defined' => sub {
        my $i = defined $j ? $j : $k;
        $i == 1 or die;
    },

    'defined or' => sub {
        my $i = $j // $k;
        $i == 1 or die;
    },
    

};

