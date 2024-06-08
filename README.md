# README

This is a base application that includes tooling for user authentication.

## Getting Started
- Copy master key to `config/master.key`
- `bin/setup`
- `bin/dev`
- `open http://localhost:3000`

## Production
### Restart
- `bin/rails assets:precompile && pumactl stop && bin/rails s -p 3002 -d`