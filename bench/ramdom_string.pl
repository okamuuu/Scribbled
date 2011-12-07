#!/usr/bin/env perl
use strict;
use warnings;
use List::Util qw/shuffle/;
use Digest;
use String::Random;
use Benchmark;

my $count = 100_000;
my $message = 'hello, world';

warn Digest->new("MD5")->add($message)->hexdigest;
warn String::Random->new->randregex('[A-Za-z0-9]{32}');

use Benchmark qw/cmpthese timethese/;

cmpthese timethese $count, {

#    shuffle_string => sub {
#        shuffle_string();
#    },

    create_random_string => sub { 
        create_random_string();
    },

    md4hexdigest => sub {
        Digest->new("MD4")->add($message)->hexdigest;
    },

    hexdigest => sub {
        Digest->new("MD5")->add($message)->hexdigest;
    },

    b64digest => sub {
        Digest->new("MD5")->add($message)->b64digest;
    },

    random_string => sub {
        String::Random->new->randregex('[A-Za-z0-9]{32}');
    },

};

#sub shuffle_string {
#    return join '', map { shuffle @words } (0..9)
#}

sub create_random_string {
    my @words = qw/A B E F G H K L M N P R S T W Y a d e f g h k m n p r s t w y 3 4 5 7 8/;

    my $num = @words;

    return join '', map { $words[int( rand($num) )] } (0..9)
}
