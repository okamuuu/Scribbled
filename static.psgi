# See Also https://github.com/miyagawa/Plack/issues/93
use Plack::Builder;
builder {
enable "Plack::Middleware::Static",
    path => sub {  s!(^/(?:[^.]*)?/?+$)!${1}/index.html! or return qr{^/.+} },
    root => './root/';
};

