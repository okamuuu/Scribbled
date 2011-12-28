#!/usr/bin/env perl
use strict;
use warnings;

use Benchmark qw/cmpthese timethese/;

my $count = 100_000;

cmpthese timethese $count, {
    now1 => sub {
        my ( $s, $m, $h, $d, $mo, $y ) = ( gmtime time )[ 0 .. 5 ];
        $y += 1900;
        $mo++;
        sprintf '%04d-%02d-%02d %02d:%02d:%02d', $y, $mo, $d, $h, $m, $s;
    },
    now2 => sub {
        my ( $sec, $min, $hour, $mday, $mon, $year, $wday, $yday, $isdst ) =
          localtime(time);
        my $time = sprintf(
            "%04d-%02d-%02dT%02d:%02d:%02d",
            $year + 1900,
            $mon + 1, $mday, $hour, $min, $sec
        );

    },
};

sub now1 {

}
