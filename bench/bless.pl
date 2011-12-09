package Tiny;
use Class::Accessor::Tiny qw/new hoge fuga/;

package MyAcceossor;
use Scribbled::Accessor qw/new hoge fuga/;

#!/usr/bin/env perl
use strict;
use warnings;

use Benchmark qw/cmpthese timethese/;

my $count = 100_000;

cmpthese timethese $count, {
    tiny => sub {
        my $tiny = Tiny->new;
        $tiny->set_hoge(1);
        $tiny->set_fuga(2);
        $tiny->get_hoge == 1 or die;
        $tiny->get_fuga == 2 or die;
    },

    my => sub { 
        my $my = MyAcceossor->new;
        $my->set_hoge(1);
        $my->set_fuga(2);
        $my->get_hoge == 1 or die;
        $my->get_fuga == 2 or die;
    },

};

