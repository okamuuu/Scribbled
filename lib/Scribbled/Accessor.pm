package Scribbled::Accessor;
sub import{
    my ($self, @metheds) = @_;
    my $caller = caller;
    *{ $caller . "::new" } = sub { return bless [], $_[0] };
    for my $index ( 0 .. scalar @metheds ){
        my $meth = $metheds[$index];
        *{ $caller . "::set_$meth" } = sub { $_[0]->[$index] = $_[1];$_[0] };
        *{ $caller . "::get_$meth" } = sub { $_[0]->[$index] };
    }
}
1;
