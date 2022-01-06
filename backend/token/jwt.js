const Koa = require('koa')
const router = require('koa-router')()
const jwt = require("jsonwebtoken")
const jwtAuth = require("koa-jwt")
const secret = "chen-secret"
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa();
app.keys = ['chen'];
app.use(static(__dirname + '/'));
app.use(bodyParser())
app.use(cors({
    credentials: true
}));
const refreshTokenList = new Map() // 缓存refresh
// 生成accessToken
const generateToken = (userinfo, expTime = 3600) => {
    const expiresIn = Math.floor(Date.now()) + expTime * 1000;
    const token = jwt.sign({
            data: userinfo,
            // 设置 token 过期时间，一小时后，秒为单位
            exp: expiresIn
        },
        secret
    )
    return {
        token,
        expiresIn
    }
}
// 生成refreshToken
const generateReToken = (userinfo, expTime = 3600 * 2) => {
    const reToken = generateToken(userinfo, expTime)
    refreshTokenList.set(reToken.token, userinfo)
    return reToken
}
// 更新refreshToken 绑定关系
const updateRefreshTokenfromList = (refreshToken, accessToken) => {
    refreshTokenList.set(refreshToken, accessToken)
}
router.post("/users/login-token", async ctx => {
    const {
        body
    } = ctx.request;
    //登录逻辑，略
    //设置session
    const userinfo = body.username;
    const accessToken = generateToken(userinfo)
    const refreshToken = generateReToken(userinfo)
    ctx.body = {
        message: "登录成功",
        code: '00000',
        result: {
            username: userinfo,
            // 生成 token 返回给客户端
            accessToken: accessToken.token,
            refreshToken: refreshToken.token,
            expiresTime: accessToken.expiresIn
        }
    };
});

router.post("/users/re-token", async ctx => {
    const {
        body
    } = ctx.request;
    //登录逻辑，略
    //设置session
    const refreshToken = body.refreshToken;
    if (refreshToken) {
        const result = refreshTokenList.has(refreshToken)
        if (result) {
            let refreshTokenPayload;
            var decode = jwt.verify( // 根据refreshToken解码获取用户信息
                refreshToken,
                secret
            );
            console.log('解码：'+decode)   //laochen log
            
            const email = decode.uid;
            const accessToken = generateToken(email); // 重新生成accessToken
            const response = {
                accessToken: accessToken.token,
                expiresIn: accessToken.expiresIn,
                token_type: "Bear",
            };
            updateRefreshTokenfromList(refreshToken, accessToken); // 更新refreshToken与accessToken的绑定关系
            ctx.response.status = 200;
            ctx.body = {
                message: "刷新成功",
                code: '00000',
                result: response
            };
        } else {
            ctx.response.status = 401;
            ctx.body = {
                error: "Unauthorized",
                msg: "The refresh token does not exist",
            };
        }
    } else {
        ctx.response.status = 400;
        ctx.body = {
            error: "Bad Request",
            msg: "The required parameters were not sent in the request",
        };
    }

});

router.get(
    "/users/getUser-token",
    jwtAuth({
        secret
    }),
    async ctx => {
        // 模拟数据库查询
        const userinfo = 'laochen'
        //获取session
        ctx.body = {
            message: "获取数据成功",
            userinfo
        };
    }
);


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);