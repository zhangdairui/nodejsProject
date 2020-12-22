var express = require('express');
var mysql = require('mysql');
var app = express();
var session = require('express-session');
var bodyparser = require('body-parser');
var uuid = require('node-uuid');


app.use(express.static('public')); //使用 express.static 中间件来设置静态文件路径,在指定静态资源的时候路径更省事
app.use(express.urlencoded({ extended: false })); //提交表单必备语句
app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }));

//监听端口
app.listen(5100,'0.0.0.0');

//-----------------------准备函数,SQL语句和中间件------------------------------//
// 使用 session 中间件
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 300, // 设置 session 的有效时间，单位毫秒
    },
}));

//连接mySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CS631',
    // multipleStatements: true   //使多条sql语句的跨表格查询得以实现
});


//连接mySQL时提示成功失败
connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');

});

//主页展示全部商品时用的SQL语句
let AllProductSQL = "SELECT * FROM (SELECT a.id, a.`name` AS productName, a.status, a.price, b.`name` as SellerName FROM Inventory a INNER JOIN Person b ON a.seller_id = b.person_id) as c WHERE `status` = 'sell';"


//主页搜索商品时用的SQL语句
let SearchProductSQL = "SELECT * FROM(SELECT a.id, a.`name` AS productName, a.price, b.`name` as SellerName FROM Inventory a INNER JOIN Person b ON a.seller_id = b.person_id) as c WHERE c.productName = ?"


//展示购物车里的商品
let DisplayCart = "SELECT * FROM(SELECT a.id, a.`name` AS productName, a.price FROM Inventory a INNER JOIN Cart b ON a.id = b.inventory_id) as c"

//展示用户的历史订单
let DisplayHistoryOrder = "SELECT * FROM `Order` WHERE user_id=?"



//-----------------------全部的页面路由------------------------------//
//routing↓routing↓routing↓routing↓routing↓routing↓routing↓routing↓

app.get('/login', (req, res) => { //===============================登录页面
    res.render('login.ejs');
})

app.get('/register', (req, res) => { //===============================注册页面
    res.render('register.ejs');
})


app.get('/', (req, res) => { //===============================首页
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            AllProductSQL, //如果有的话进入首页显示所有商品
            (error, results) => {

                res.render('home.ejs', { PRODUCTS: results, userID: req.session.userName })
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})

app.get('/about', (req, res) => { //===============================关于页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            AllProductSQL, //如果有的话进入首页显示所有商品
            (error, results) => {

                res.render('about.ejs', { userID: req.session.userName })
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})

app.get('/cart', (req, res) => { //===============================购物车页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            DisplayCart, //展示购物车里有的所有商品
            (error, results) => {

                res.render('cart.ejs', { userID: req.session.userName, CART_PRODUCTS: results })
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})


app.get('/createOrder', (req, res) => { //===============================创建订单页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            DisplayCart, //展示购物车里有的所有商品
            (error, results) => {

                res.render('createOrder.ejs', { userID: req.session.userName, CART_PRODUCTS: results })
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})


app.get('/account', (req, res) => { //===============================ACCOUNT页面
    if (req.session.userName != null) {
        connection.query(
            'SELECT * FROM Person WHERE mail =?', //先去找到userMail在Person表格里对应的id
            [req.session.userName],
            (err, results) => {
                if (err) {
                    console.log('err message:', err)
                    return
                } else {
                    var personID = results[0].person_id; //把找到的person_id存为变量
                    connection.query(
                        DisplayHistoryOrder, //找出该id下的订单
                        [personID],
                        (err, result) => {
                            if (err) {
                                console.log('err message:', err)
                                return
                            } else {
                                res.render('account.ejs', { userID: req.session.userName, ORDERS: result, PROFILE: results });
                            }
                        })
                }
            }) //connection.query END
    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }


})
//-----------------------全部的页面功能------------------------------//

//-----------------------Login功能------------------------------//
app.use('/login', (req, res) => {
    var login = {
        "user": req.body.user,
        "pwd": req.body.pwd
    }

    var loginsql = "select mail,password from Person where mail='" + login.user + "'and password='" + login.pwd + "'"
    connection.query(loginsql, (err, result) => {
        if (err) {
            console.log('err message:', err)
            return
        }
        if (result == '') {
            console.log('Wrong Email address or password!')
            res.json({ code: -1, msg: 'Wrong Email address or password!' })

        } else {

            req.session.userName = req.body.user; // 登录成功，设置 session

            console.log('Login succeed! Session is' + req.session.userName);
            res.json({ code: 1, msg: 'Login succeed!' })

            // res.redirect('/'); //登录这一整块已经注定是前端跳转了，所以不要这样用后端redirect，是无效的

        }
    })
})

//-----------------------LogOut功能------------------------------//
app.get('/logout', function(req, res) {
    req.session.userName = null; // 删除session
    res.redirect('/login');
});

//-----------------------Sign Up功能------------------------------//
app.post('/signup', (req, res) => {

    connection.query(
        'INSERT INTO person SET ?', //mySQL插入语句，问号对应下面几行的内容
        {
            person_id: uuid.v4(),
            mail: req.body.user,
            password: req.body.pwd1,
            type: 'buyer'
        },

        (error, results) => {
            if (error) {
                console.log('Error!');
            } else {
                console.log('Sign up succeed! Login please!');
                res.redirect('/login');
            }

        }

    );
})

//-----------------------主页搜索功能------------------------------//
app.post('/search', (req, res) => {
    //将提交的id在数据库搜索
    connection.query(
        SearchProductSQL,
        [req.body.searchProductName],
        (error, results) => {

            res.render('home.ejs', { PRODUCTS: results, userID: req.session.userName });
            //res.render是渲染视图的函数：res.render(view,[locals],callback)
            //第一个参数是渲染的view，同时向callback传递渲染的字符串也就是results，作为USER传到hello.ejs的<%=%>中
        })
})

//-----------------------点击按钮添加购物车功能------------------------------//

app.use('/add', (req, res) => {
    var cartProducts = {
        "userMail": req.body.userMail, //这里的userMail和product_id是从ajax里传过来的
        "product_id": req.body.product_id
    }
    connection.query(
        'SELECT person_id FROM Person WHERE mail =?', //先去找到userMail在Person表格里对应的id
        [cartProducts.userMail],
        (err, results) => {
            if (err) {
                console.log('err message:', err)
                return
            } else {
                var personID = results[0].person_id; //把找到的person_id存为变量
                // console.log(personID);
                connection.query(
                    'SELECT * FROM Cart WHERE inventory_id=?',
                    [req.body.product_id],
                    (err, results) => {
                        if (err) {
                            console.log('err message:', err)
                            return
                        }
                        if (results == '') {
                            //添加到购物车
                            connection.query(
                                'INSERT INTO Cart SET ?', //开始向购物车表格里插入数据
                                {
                                    person_id: personID, //使用刚刚找到的person_id
                                    inventory_id: req.body.product_id, //使用直接从页面ajax过来的productid
                                    //Cart表格里time是自动生成的。所以不用管
                                },
                                (err, results) => {
                                    if (err) {
                                        console.log('err message:', err)
                                        return
                                    } else {
                                        // console.log(userID);
                                        res.json({ code: 1 })
                                    }
                                })
                        } else {
                            res.json({ code: 0 }) //商品已存在
                        }
                    }
                )
            }
        }
    )
})

//-----------------------删除购物车商品的功能------------------------------//
app.use('/remove', (req, res) => {
    var cartProducts = {
        "userMail": req.body.userMail, //这里的userMail和product_id是从ajax里传过来的
        "product_id": req.body.product_id
    }
    connection.query(
        'SELECT person_id FROM Person WHERE mail =?', //先去找到userMail在Person表格里对应的id
        [cartProducts.userMail],
        (err, results) => {
            if (err) {
                console.log('err message:', err)
                return
            } else {
                var personID = results[0].person_id; //把找到的person_id存为变量
                // console.log(personID);
                connection.query(
                    'SELECT * FROM Cart WHERE inventory_id=?',
                    [req.body.product_id],
                    (err, results) => {
                        if (err) {
                            console.log('err message:', err)
                            return
                        } else {
                            //从Cart表格里删除userID与inventory都符合条件的那一条
                            var DeleteSQL = "DELETE FROM CART where person_id='" + personID + "'AND inventory_id='" + req.body.product_id + "'"
                            connection.query(
                                DeleteSQL,
                                (err, results) => {
                                    if (err) {
                                        console.log('err message:', err)
                                        return
                                    } else {
                                        // console.log(userID);
                                        res.json({ code: 1 })
                                    }
                                })
                        }
                    }
                )
            }
        }
    )
})

//-----------------------提交订单功能------------------------------//
//----------------------①存入Order表格
//--------------------- ②存入Order-Inventory表格
//--------------------- ③清空cart表格
//----------------------④改location表格，把格子空出来
//----------------------⑤改Inventory状态成sold
//----------------------⑥Succeed之后页面跳转至首页


app.use('/create', (req, res) => {
    var createOrder = {
        "userMail": req.body.userMail,
        "shippingAddr": req.body.shippingAddr,
        "total": req.body.total

    }
    var orderProduct = req.body.order_inventory;
    var orderID = uuid.v4(); //生成订单ID
    //req.body.userMail, //这里的userMail和product_id是从ajax里传过来的
    //req.body.product_id   //是一个数组
    //req.body.shippingAddr //邮寄地址

    connection.query(
        //----------------------①存入Order表格
        'SELECT person_id FROM Person WHERE mail =?', //先去找到userMail在Person表格里对应的id
        [createOrder.userMail],
        (err, results) => {
            if (err) {
                console.log('err message:', err)
                return
            } else {
                var personID = results[0].person_id; //把找到的person_id存为变量

                connection.query(
                    'INSERT INTO `Order` SET ?', //开始向Order表格里插入数据
                    {
                        user_id: personID, //使用刚刚找到的person_id
                        order_id: orderID,
                        order_type: "buyer_order",
                        payment_method: "paypal", //指代paypal
                        order_status: "order_created",
                        fee: req.body.total,
                        address: req.body.shippingAddr

                    },
                    (err, results) => {
                        if (err) {
                            console.log('err message:', err)
                            return
                        } else {

                            //--------------------- ②存入Order-Inventory表格

                            for (var i = 0; i < orderProduct.length; i++) {

                                if (orderProduct[i] == "abc") { //数组的第一项总是abc，防止数组里只有一项的时候，在下面的for循环里被当成string拆分成字母
                                    console.log("Start Insert Data");
                                    continue;
                                } else {
                                    connection.query(

                                        'INSERT INTO `Order_Inventory` SET ?', //开始向Order_Inventory里插入数据
                                        {
                                            order_id: orderID,
                                            inventory_id: orderProduct[i]
                                        },
                                        (err, results) => {
                                            if (err) {
                                                console.log('err message:', err)
                                                return
                                            } else {
                                                console.log("Insert Order_Inventory Data"); //插入数据的提醒
                                            }
                                        })
                                }

                            }
                            //--------------------- ③清空购物车
                            connection.query(
                                'DELETE FROM Cart WHERE person_id = ?',
                                [personID],
                                (err, results) => {

                                    if (err) {
                                        console.log('err message:', err)
                                        return
                                    } else {
                                        console.log("shopping cart is empty now!");
                                    }
                                }
                            )
                            //--------------------- ④改location表格

                            for (var i = 0; i < orderProduct.length; i++) {

                                if (orderProduct[i] == "abc") { //数组的第一项总是abc，防止数组里只有一项的时候，在下面的for循环里被当成string拆分成字母
                                    console.log("Start Change Location");
                                    continue;
                                } else {
                                    connection.query(
                                        'UPDATE Location SET inventory_id=NULL WHERE inventory_id=?', //开始向Order_Inventory里插入数据
                                        [orderProduct[i]],
                                        (err, results) => {
                                            if (err) {
                                                console.log('err message:', err)
                                                return
                                            } else {
                                                console.log("Location Changed"); //插入数据的提醒
                                            }
                                        })
                                    connection.query(//--------------------- ⑤改Inventory表格
                                        'UPDATE Inventory SET status= "sold" WHERE id=?', 
                                        [orderProduct[i]],
                                        (err, results) => {
                                            if (err) {
                                                console.log('err message:', err)
                                                return
                                            } else {
                                                console.log("Inventory Status Changed"); 
                                            }
                                        })
                                }
                            }

                            //--------------------- ⑥Succeed页面跳转
                            res.json({ code: 1 }); //提示前台订单提交成功，跳转由前台完成

                        }
                    })
            }
        }
    )
})

//-----------------------修改个人信息功能------------------------------//
app.post('/update/:id',(req,res)=>{

  var userModSql = 'UPDATE Person SET name=?,mail=? WHERE person_id=?';
  var userModSql_Params = [
    req.body.name,
    req.body.email,
    req.params.id //这里一定要用id，而不是userID，app.js只认识它自己定义的id，而不认识userID
    ];
  
  connection.query(
    userModSql, //sql语句
    userModSql_Params, //指定如何修改
    (error,results) =>{
      if (error){
        console.log('Edit Error');
      }else{
        console.log('Edit Succeed! User: '+req.params.id+' has been edited!')
      }
     }
    );
})