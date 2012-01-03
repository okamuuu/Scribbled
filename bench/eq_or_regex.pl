#!/usr/bin/env perl
use strict;
use warnings;

use Benchmark qw/cmpthese timethese/;

my $count = 100_000;
my $hoge = 'hoge';
my $fuga = 'hoge';
my $piyo = 'piyo';

cmpthese timethese $count, {
    or_eq => sub {
#        $hoge eq 'hoge' or $hoge eq 'fuga' ? 1 : 0;
#        $fuga eq 'hoge' or $fuga eq 'fuga' ? 1 : 0;
        $piyo eq 'hoge' or $fuga eq 'fuga' or $piyo eq 'piyo' ? 1 : 0;
    },
    regex => sub {
#        $hoge =~ m/^(?:hoge|fuga)$/ ? 1 : 0;
#        $fuga =~ m/^(?:hoge|fuga)$/ ? 1 : 0;
        $fuga =~ m/^(?:hoge|fuga|piyo)$/ ? 1 : 0;
    },
};
