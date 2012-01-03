# See Also https://github.com/miyagawa/Plack/issues/93
use Plack::Builder;
builder {
enable "Plack::Middleware::Static",
    # XXX: I don't know about localhost/dir ( last char is not / ).
    path => sub { s!(.*/$)!${1}/index.html! or s!(style.css$)!/import.css! or return qr{^/.+} },
    root => './root/';
};

