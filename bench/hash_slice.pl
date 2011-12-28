#!/usr/bin/env perl
use strict;
use warnings;
use Benchmark qw/cmpthese timethese/;
my $count = 10_000_000;

my %hash = ( hoge => 0, fuga => 1, piyo => 2, moge => 3, moga => 4, mogo => 5 );
my @columns = qw/hoge fuga piyo/;

cmpthese timethese $count, {
    normal => sub {
        my %h = (
            hoge => $hash{hoge},
            fuga => $hash{fuga},
            piyo => $hash{piyo},
        );
        $h{hoge} == 0 or die;
        $h{fuga} == 1 or die;
        $h{piyo} == 2 or die;
      },

    slice => sub { 
        my ($hoge, $fuga, $piyo) = @hash{qw/hoge fuga piyo/};
        $hoge == 0 or die;
        $fuga == 1 or die;
        $piyo == 2 or die;
    },
};

