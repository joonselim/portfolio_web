"""server.py — local dev server with /api/claude proxy to Anthropic API
Usage: python3 server.py
Then open http://localhost:3000
API key is read from .env file: ANTHROPIC_API_KEY=sk-ant-...
"""

import ssl
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.request import urlopen, Request
from urllib.error import HTTPError

# macOS Python 3 SSL fix: system certs not trusted by default
_ssl_ctx = ssl.create_default_context()
_ssl_ctx.check_hostname = False
_ssl_ctx.verify_mode = ssl.CERT_NONE

# Read API key from .env
API_KEY = ''
try:
    with open('.env') as f:
        for line in f:
            line = line.strip()
            if line.startswith('ANTHROPIC_API_KEY='):
                API_KEY = line.split('=', 1)[1]
except FileNotFoundError:
    print('Warning: .env file not found. Create one with ANTHROPIC_API_KEY=sk-ant-...')


class Handler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/claude':
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)

            req = Request(
                'https://api.anthropic.com/v1/messages',
                data=body,
                headers={
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                    'anthropic-version': '2023-06-01',
                },
                method='POST',
            )
            try:
                with urlopen(req, context=_ssl_ctx) as resp:
                    data = resp.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(data)
            except HTTPError as e:
                data = e.read()
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(data)
        else:
            self.send_response(405)
            self.end_headers()

    def log_message(self, fmt, *args):
        print(fmt % args)


print('Server running at http://localhost:3000')
HTTPServer(('', 3000), Handler).serve_forever()
