#!/usr/bin/env perl
use strict;
use warnings;

use Benchmark qw/cmpthese timethese/;

my $count = 10_000_000;

my @array = (qw/hoge fuga piyo foo bar moga muge mogo/);

cmpthese timethese $count, {
    count1 => sub {
        my $count = scalar @array; 
        $count == 8 or die;
    },
    count2 => sub {
        my $count = @array; 
        $count == 8 or die;
    },
    index1 => sub {
        my $index = $#array;
        $index == 7 or die;
    },
    index2 => sub {
        my $index = scalar @array - 1;
        $index == 7 or die;
    },
};

