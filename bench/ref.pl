#!/usr/bin/env perl
use strict;
use warnings;
use List::Util qw/shuffle/;
use Digest;
use String::Random;
use Benchmark qw/cmpthese timethese/;
my $count = 100_000;
my $message = 'hello, world';

cmpthese timethese $count, {
    scalar => sub {
        my $scalar= 12;
        my $self = bless \$scalar;
    },

    arrayref => sub { 
        my @array=(1,2);
        my $self = bless \@array;
        $self->[0];
        $self->[1]=22;
    },

    hashref => sub {
        my %hash=(1=>2);
        my $self = bless \%hash;
        $self->{1};
        $self->{1} = 22;
    },

};

