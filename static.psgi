# See Also https://github.com/miyagawa/Plack/issues/93
use Plack::Builder;
builder {
    enable "Plack::Middleware::Static", path => qr{^/.+}, root => './root/';
    ### XXX: I don't know about /root/**/index.html ... 
    mount "/" => Plack::App::File->new( file => "./root/index.html" )->to_app;
};

