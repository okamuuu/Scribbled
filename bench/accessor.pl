#!/usr/bin/env perl
package Lite;
use Class::Accessor::Lite( new => 1, rw => [qw/hoge fuga piyo/] );

package MyAcceossor;
use Scribbled::Accessor qw/hoge fuga piyo/;

package InsideOut;
use strict;
use warnings;
use Scalar::Util qw/refaddr/;
{
    my %hoge_of;
    my %fuga_of;
    my %piyo_of;

    sub new {
        my ($class, %params) = @_;
        my $scalar;
        my $self = bless \$scalar, $class;
        $scalar = $self + 0;
        $self->init(%params);
        return $self;
    }

    sub init {
        my ($self, %params) = @_;
        $hoge_of{ $$self } = $params{hoge};
        $fuga_of{ $$self } = $params{fuga};
        $piyo_of{ $$self } = $params{piyo};
    }
 
    sub DESTROY {
        my $self = shift;
        delete $hoge_of{ $$self };
        delete $fuga_of{ $$self };
        delete $piyo_of{ $$self };
        return;
    }

    sub hoge {
       my $self = shift;
       $hoge_of{ $$self } = shift if @_;
       $hoge_of{ $$self };
    }
    
    sub fuga {
       my $self = shift;
       $fuga_of{ $$self } = shift if @_;
       $fuga_of{ $$self };
    }
 
    sub piyo {
       my $self = shift;
       $piyo_of{ $$self } = shift if @_;
       $piyo_of{ $$self };
    }
}

package main;
use strict;
use warnings;

use Benchmark qw/cmpthese timethese/;

my $count = 100_000;

cmpthese timethese $count, {
    lite => sub {
        my $lite = Lite->new(hoge=>1, fuga=>2, piyo=>3);
        $lite->hoge == 1 or die;
        $lite->fuga == 2 or die;
        $lite->piyo == 3 or die;
=pod
        $lite->hoge(11);
        $lite->fuga(22);
        $lite->piyo(33);
        $lite->hoge == 11 or die;
        $lite->fuga == 22 or die;
        $lite->piyo == 33 or die;
=cut
    },

    my => sub { 
        my $my = MyAcceossor->new(hoge=>1,fuga=>2,piyo=>3);
        $my->get_hoge == 1 or die;
        $my->get_fuga == 2 or die;
        $my->get_piyo == 3 or die;
=pod
        $my->set_hoge(11);
        $my->set_fuga(22);
        $my->set_piyo(33);
        $my->get_hoge == 11 or die;
        $my->get_fuga == 22 or die;
        $my->get_piyo == 33 or die;
=cut
    },

    insideout => sub { 
        my $io = InsideOut->new(hoge=>1,fuga=>2,piyo=>3);
        $io->hoge == 1 or die;
        $io->fuga == 2 or die;
        $io->piyo == 3 or die;
    },

};

