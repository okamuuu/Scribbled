#!/usr/bin/env perl
use strict;
use warnings;
use Benchmark qw/cmpthese timethese/;
my $count = 10_000_000;
my $message = 'hello, world';

my %hash = ( hoge => 0, fuga => 1, piyo => 2, moge => 3, moga => 4, mogo => 5 );

cmpthese timethese $count, {
    map => sub {
        my @array = map { $hash{$_} } qw/hoge fuga piyo/;
        $array[0] == 0 or die;
        $array[2] == 2 or die;
    },

    slice => sub { 
        my @array = @hash{qw/hoge fuga piyo/};
        $array[0] == 0 or die;
        $array[2] == 2 or die;
    },
};

