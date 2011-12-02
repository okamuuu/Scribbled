#!/usr/bin/env perl
use strict;
use warnings;
use Test::More;
use Test::Warn;

warning_is { sub { warn 'hoge' }->() } 'hoge';

done_testing;
