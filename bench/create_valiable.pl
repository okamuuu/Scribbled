#!/usr/bin/env perl
use strict;
use warnings;
use List::Util qw/shuffle/;
use Digest;
use String::Random;
use Benchmark qw/cmpthese timethese/;
my $count = 10_000_000;

my $config->{hoge}->{fuga}->{piyo} = 1;

cmpthese timethese $count, {
    test1 => sub {
        if ( $config->{hoge}->{fuga}->{piyo} == 1 ) {
          return $config->{hoge}->{fuga}->{piyo};
        }
      },

    test2 => sub { 
        my $piyo = $config->{hoge}->{fuga}->{piyo};
        if ( $piyo == 1 ) {
            return $piyo;
        }
    },
};

