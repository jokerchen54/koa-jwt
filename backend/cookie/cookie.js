const http = require("http")
http
    .createServer((req, res) => {
        if (req.url === '/favicon.ico') {
            res.end('')
            return
        }
        if (req.url.indexOf('testCookie' > -1)) {
            // 观察cookie存在
            console.log('Cookie:', req.headers.cookie || '无Cookie')
            // 设置cookie
            res.setHeader('Set-Cookie', 'cookie1=vvc;')
            res.end('hello cookie!!')
        }

    })
    .listen(3000)