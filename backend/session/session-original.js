// session原理
const http = require("http")
const session = {}
http
    .createServer((req, res) => {
        // 观察cookie存在
        // console.log('cookie:', req.headers.cookie)
        const sessionKey = 'sid'
        const cookie = req.headers.cookie
        if (cookie && cookie.indexOf(sessionKey) > -1) {
            // 简略写法未必具有通用性
            const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
            const sid = pattern.exec(cookie)[1]
            console.log('session:',  session[sid])
            res.end('Come Back ')
        } else {
            // 模拟后端随机生成sid
            const sid = (Math.random() * 99999999).toFixed()
            // 设置cookie
            res.setHeader('Set-Cookie', `${sessionKey}=${sid};`)
            // 模拟数据库查询后，得到的用户信息
            session[sid] = {
                name: 'laowang'
            }
            console.log('生成sid：'+sid)   //laochen log
            
            res.end('Hello')
            return
        }
    })
    .listen(3000)