package Scribbled::Accessor;
use warnings;
sub import {
    my ($self, @methods) = @_;
    my $caller = caller;

    *{ $caller . "::new" } = sub { 
        my $class = shift;
        my %params = (@_ == 1 && ref($_[0]) eq 'HASH' ? %{$_[0]} : @_);
        return bless [ @params{@methods} ], $class;
    };

    for my $index ( 0 .. $#methods ){
        my $meth = $methods[$index];
        *{ $caller . "::set_" . $meth } = sub { $_[0]->[$index] = $_[1];$_[0] };
        *{ $caller . "::get_" . $meth } = sub { $_[0]->[$index] };
    }
}

1;
