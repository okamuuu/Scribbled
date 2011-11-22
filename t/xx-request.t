package main;
use strict;
use warnings;
use HTTP::Server::PSGI;
use Test::More;
use Test::TCP ();
use HTTP::Request;
use LWP::UserAgent;
use URI;
use Data::Dumper;

my $success   = [ 200, [ 'Content-Type' => 'text/plain' ], ["Hello World"] ];
my $not_found = [ 404, [ "Content-Type" => "text/plain" ], ["File not found"] ];

my $app = sub {
    my $env = shift;

    return {
        '/'    => $success,
        '/404' => $not_found,
    }->{ $env->{REQUEST_URI} };
};

my $server = Test::TCP->new(
    code => sub {
        my $port = shift;
        HTTP::Server::PSGI->new(
            host    => "127.0.0.1",
            port    => $port,
            timeout => 120,
        )->run($app);
    },
);

my $ua = LWP::UserAgent->new();

subtest 'request return 200' => sub {
    my $uri = URI->new('http://localhost');
    $uri->port( $server->port );
    my $req = HTTP::Request->new( GET => $uri );
    my $res = $ua->request($req);

    is $res->code, 200;
};

subtest 'request return 404' => sub {
    my $uri = URI->new('http://localhost/404');
    $uri->port( $server->port );
    my $req = HTTP::Request->new( GET => $uri );
    my $res = $ua->request($req);

    is $res->code, 404;
};

done_testing;

