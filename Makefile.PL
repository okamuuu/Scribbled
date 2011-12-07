use inc::Module::Install;
name 'Scribbled';
all_from 'lib/Scribbled.pm';

requires 'Plack';
requires 'Digest';
requires 'String::Random';

tests 't/*.t';
author_tests 'xt';

test_requires 'Test::More';
auto_set_repository;
auto_include;
WriteAll;
