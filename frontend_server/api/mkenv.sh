printf "TOKEN_SECRET=" > .env
xxd -l 64 -p -c 9000 /dev/urandom >> .env