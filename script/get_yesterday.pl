#!/usr/bin/env perl
use strict;
use warnings;
use DateTime;

warn DateTime->now()->subtract( seconds => 1 )->ymd;
