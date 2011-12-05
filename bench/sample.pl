#!/usr/bin/env perl
use strict;
use warnings;
use Digest;
use Benchmark;

my $count = 100_000;
my $message = 'hello, world';

warn Digest->new("MD5")->add($message)->digest;
warn Digest->new("MD5")->add($message)->hexdigest;
warn Digest->new("MD5")->add($message)->b64digest;

use Benchmark qw/cmpthese timethese/;

cmpthese timethese $count, {
    digest => sub {
        Digest->new("MD5")->add($message)->digest;
    },
    binary => sub {
        Digest->new("MD5")->add($message)->hexdigest;
    },
    hex => sub {
        Digest->new("MD5")->add($message)->b64digest;
    },
};


