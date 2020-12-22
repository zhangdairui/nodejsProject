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

//localhost监听端口
app.listen(7000,'0.0.0.0');

//-----------------------准备和中间件------------------------------//
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

//-----------------------准备SQL语句------------------------------//

var ManagerSQL = "SELECT position,name FROM Person WHERE mail = ? ";
var InventorySQL = "SELECT a.*,b.`name` as SellerName FROM Inventory a INNER JOIN Person b ON a.seller_id = b.person_id;";
var SearchInventorySQL = "SELECT * FROM(SELECT a.*,b.`name` as SellerName FROM Inventory a INNER JOIN Person b ON a.seller_id = b.person_id) as c WHERE c.status = ?"
var OrderDetailSQL = "SELECT * FROM (SELECT c.*, d.order_status, d.manager_id FROM(SELECT a.*,b.order_id as ORDERID FROM Inventory a INNER JOIN Order_Inventory b ON a.id = b.inventory_id)as c INNER JOIN `Order` d ON c.ORDERID = d.order_id) as z WHERE z.ORDERID =?"


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
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                res.render('home.ejs', { adminInfo: results[0] })
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})


app.get('/employee', (req, res) => { //===============================employee页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        "SELECT * FROM Person WHERE type='manager'",
                        (err, result) => {
                            res.render('employee.ejs', { adminInfo: results[0], EMPLOYEES: result })
                        }
                    )
                }
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})


app.get('/inventory', (req, res) => { //===============================inventory页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        InventorySQL,
                        (err, result) => {
                            res.render('inventory.ejs', { adminInfo: results[0], INVENTORY: result })
                        }
                    )
                }
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})

app.get('/customerInfo', (req, res) => { //===============================customer页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        "SELECT * FROM Person WHERE type='seller'",
                        (err, result) => {
                            res.render('customerInfo.ejs', { adminInfo: results[0], CUSTOMERS: result })
                        }
                    )
                }
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})


app.get('/newCustomer', (req, res) => { //===============================添加新Customer页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                res.render('newCustomer.ejs', { adminInfo: results[0] })
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})


app.get('/warehouseInfo', (req, res) => { //===============================WarehouseInfo页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        "SELECT * FROM Warehouse ",
                        (err, result) => {
                            res.render('warehouseInfo.ejs', { adminInfo: results[0], WAREHOUSES: result })
                        }
                    )
                }
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})

app.get('/orderCustomer', (req, res) => { //===============================order2页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        "SELECT * FROM `Order` WHERE order_type='seller_order'",
                        (err, result) => {
                            res.render('order2.ejs', { adminInfo: results[0], ORDERCUSTOMER: result })
                        }
                    )
                }
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})
app.get('/customerOrderDetail/:id', (req, res) => { //===============================Order2详情页面
    if (req.session.userName != null) { //判断是否有session
        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {
                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        OrderDetailSQL,
                        [req.params.id],
                        (err,result) =>{
 
                            connection.query(
                                "SELECT * FROM Person WHERE `type`='manager';",
                                (erro,resul)=>{
                                    if (erro) {
                                        console.log(erro);
                                        return
                                    }else{
                                        console.log(result[0]);
                                         res.render('customerOrderDetail.ejs', { adminInfo: results[0], orderItem:result, orderID: req.params.id, orderStatus: result[0].order_status, orderManager: result[0].manager_id, allManager: resul});
                                    }
                                   
                                }

                                )
                            
                        }
                        )
           
                }
            }
        )
    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})


app.get('/orderEnd', (req, res) => { //===============================order3页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        "SELECT * FROM `Order` WHERE order_type='buyer_order'",
                        (err, result) => {
                            res.render('order3.ejs', { adminInfo: results[0], ORDEREND: result })
                        }
                    )
                }
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})

app.get('/editInventory/:id', (req, res) => { //===============================editInventory页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        'SELECT id, name, price,seller_id FROM Inventory WHERE id=?',
                        [req.params.id],
                        (err,result) =>{
                            // console.log(result);
                            res.render('editInventory.ejs', { adminInfo: results[0],inventoryItem:result[0]});
                        }
                        )
           
           
                }
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})

app.get('/editCustomer/:id', (req, res) => { //===============================editCustomer页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        'SELECT person_id, name, position, mail FROM Person WHERE person_id=?',
                        [req.params.id],
                        (err,result) =>{
                            // console.log(result);
                            res.render('editCustomer.ejs', { adminInfo: results[0],customerItem:result[0]});
                        }
                        )
           
           
                }
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})

app.get('/makeInvoices/:id', (req, res) => { //===============================createInvoices页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            'SELECT position,name,person_id FROM Person WHERE mail = ? ',
            [req.session.userName],
            (error, results) => {

                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        'SELECT person_id, name,balance FROM Person WHERE person_id=?',
                        [req.params.id],
                        (err,result) =>{
                           
                            res.render('createInvoices.ejs', { adminInfo: results[0],customerItem:result[0]});
                        }
                        )
           
           
                }
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})


app.get('/invoiceSuccess', (req, res) => { //===============================创建invoice成功页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                res.render('invoiceSuccess.ejs', { adminInfo: results[0] })
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})

app.get('/warehouseLocation/:name', (req, res) => { //===============================warehouse详情页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {
                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        'SELECT * FROM Location WHERE warehouse_name=?',
                        [req.params.name],
                        (err,result) =>{
                            
                            res.render('warehouseManage.ejs', { adminInfo: results[0],locationItem:result, warehouseName:result[0]});
                        }
                        )
           
                }
            }
        )
    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})

app.get('/editLocation/:id', (req, res) => { //===============================编辑货架信息locationEdit页面
    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        'SELECT * FROM Location WHERE id=?',
                        [req.params.id],
                        (err,result) =>{
                            // console.log(result);
                            res.render('locationEdit.ejs', { adminInfo: results[0],locationInfo:result[0]});
                        }
                        )
           
           
                }
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})




//-----------------------全部的功能路由------------------------------//

//-----------------------注册功能------------------------------//
app.post('/signup', (req, res) => {

    connection.query(
        'INSERT INTO person SET ?', //mySQL插入语句，问号对应下面几行的内容
        {
            person_id: uuid.v4(),
            mail: req.body.user,
            password: req.body.pwd1,
            type: "manager",
            position: req.body.position,
            name: req.body.adminName
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

//-----------------------Login功能------------------------------//
app.use('/login', (req, res) => {
    var login = {
        "user": req.body.user,
        "pwd": req.body.pwd
    }

    var loginsql = "SELECT mail,password FROM Person WHERE `type`='manager' AND mail= '" + login.user + "' AND password= '" + login.pwd + "' "
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


//-----------------------筛选inventory功能------------------------------//


app.post('/searchInventory', (req, res) => {

    if (req.session.userName != null) { //判断是否有session

        connection.query(
            ManagerSQL,
            [req.session.userName],
            (error, results) => {

                if (error) {
                    console.log('Error!');
                    return
                } else {
                    connection.query(
                        SearchInventorySQL,
                        [req.body.inventoryStatus],
                        (err, result) => {
                            res.render('inventory.ejs', { adminInfo: results[0], INVENTORY: result })
                        }
                    )
                }
            }
        )


    } else {
        res.redirect('/login') //如果没有的话跳转登录界面
    }
})

//--------------编辑inventory信息提交更新数据库--------------//
app.post('/updateInventory/:id',(req,res)=>{

  var inventoryModSql = 'UPDATE Inventory SET name=?,price=? WHERE `id`=?';
  var inventoryModSql_Params = [
    req.body.inventoryName,
    req.body.inventoryPrice,
    req.params.id 
    ];
  
  connection.query(
    inventoryModSql, //sql语句
    inventoryModSql_Params, //指定如何修改
    (error,results) =>{
      if (error){
        console.log('Edit Inventory failed!'+error);
      }else{
        console.log('Edit Succeed！Inventory '+req.params.id+' has been changed!');
        res.redirect('/inventory'); //重定向显示
      }
     }
    );
})

//--------------编辑location信息提交更新数据库--------------//
app.post('/updateLocation/:id',(req,res)=>{

  var locationModSql = 'UPDATE Location SET inventory_id=?,length=?,width=?,height=? WHERE `id`=?';
  var locationModSql_Params = [
    req.body.locationInventory,
    req.body.locationLength,
    req.body.locationWidth,
    req.body.locationHeight,
    req.params.id 
    ];

  
  connection.query(
    locationModSql, //sql语句
    locationModSql_Params, //指定如何修改
    (error,results) =>{
      if (error){
        console.log('Edit Location failed!'+error);
      }else{
        console.log('Edit Succeed！Location '+req.params.id+' has been changed!');
        res.redirect('/warehouseInfo'); //重定向显示
        
      }
     }
    );
})

//--------------添加新Customer提交表单--------------//
app.post('/createCustomer',(req,res) => {
  console.log(req.body.userName);
  //将提交的内容插入数据库
  connection.query(
    'INSERT INTO Person SET ?',  
    {person_id:uuid.v4(),
    type:"seller",
    position:req.body.customerType,
    balance:req.body.customerBalance,
    mail:req.body.customerMail,
    name:req.body.customerName,
    password:"123"},
    //将新的数据库显示在网页上
    (error,results) => {
      if (error) {
        console.log('Create Failed!'+error);
      }else{
        console.log('Create Succeed');
        res.redirect('/customerInfo'); //重定向显示，防止每次刷新都新增一条重复的数据
      }
      
    }


    );

})

//--------------编辑customer信息提交更新数据库--------------//
app.post('/updateCustomer/:id',(req,res)=>{

  var customerModSql = 'UPDATE Person SET name=?,mail=? WHERE person_id=?';
  var customerModSql_Params = [
    req.body.customerName,
    req.body.customerMail,
    req.params.id 
    ];
  
  connection.query(
    customerModSql, //sql语句
    customerModSql_Params, //指定如何修改
    (error,results) =>{
      if (error){
        console.log('Edit Customer failed!'+error);
      }else{
        console.log('Edit Succeed！Customer '+req.params.id+' has been changed!');
        res.redirect('/customerInfo'); //重定向显示
      }
     }
    );
})



//--------------把商品存到location里的store按钮功能--------------//
app.use('/storeInventory', (req, res) => {
    var inventorySize = {
        "inventoryID": req.body.inventoryID, 
        "inventoryLength": req.body.inventoryLength, 
        "inventoryHeight": req.body.inventoryHeight, 
        "inventoryWidth": req.body.inventoryWidth
    }

    connection.query(
        'UPDATE Location SET inventory_id=? WHERE length>? AND width>? AND height>? AND inventory_id ="" LIMIT 1;', //注意空值查询的写法 不要用null会没有结果
        [
        inventorySize.inventoryID,
        inventorySize.inventoryLength,
        inventorySize.inventoryWidth,
        inventorySize.inventoryHeight,
        ],
        (err, results) => {
            if (err) {
                console.log('err message:', err)
                return
            } else { //储存成功了之后需要修改inventory的状态从prestore->store
                console.log("Store to location succeed!");
                connection.query(
                    'UPDATE Inventory SET status=? WHERE id=?',
                    ["store",
                    inventorySize.inventoryID
                    ],
                    (error, result) =>{
                        if (error){
                            console.log('err message:', error)
                            return
                        }else{
                            console.log("Change inventory status succeed!");
                            //成功换状态之后要把当前location对应的warehouse填写到inventory里
                            connection.query(
                                'SELECT warehouse_name FROM Location WHERE inventory_id=?',
                                [inventorySize.inventoryID],
                                (erro,resu)=>{
                                    if (erro){
                                    console.log('err message:', err)
                                    return
                                    }else{
                                         
                                        connection.query(
                                            'UPDATE Inventory SET warehouse_id=? WHERE id=?',
                                            [resu[0].warehouse_name,
                                            inventorySize.inventoryID
                                            ],
                                            (er,resultt)=>{
                                                if (er){
                                                    console.log('err message:', er)
                                                    return
                                                }else{
                                                    console.log('warehouse ID of this inventory has been changed!');
                                                    res.json({ code: 1 }) //通知前端
                                                }
                                            }

                                            )
                                    }
                                }
                                )             
                        }
                    }
                    )
            }
        }
    )
})

//--------------Refresh 订单状态按钮 --------------//
app.use('/refreshStatus', (req, res) => {
    var orderID = {
        "orderID": req.body.orderID, 
    }

    connection.query(
        'UPDATE `Order` SET order_status=? WHERE order_id=?', 
        [
        "order_completed",
        orderID.orderID
        ],
        (err, results) => {
            if (err){
                console.log('err message:', err)
                return
            }else{
                console.log('order status has been changed!');
                res.json({ code: 1 }) //通知前端
            }
        }
    )
})



//--------------创建invoice提交表单-----------------------------------//
//--------------①把前台表单的数据插入invoice-------------//
//--------------②更新Person里的balance（减去账单的费用之后）--------------//

app.post('/createInvoices',(req,res) => {

  //将提交的内容插入数据库
  connection.query(
    'INSERT INTO Invoice SET ?', //--------------①把前台表单的数据插入invoice
    {
       description:req.body.description,
       employee_id: req.body.employeeID,
       seller_id: req.body.sellerID,
       money: 0 - req.body.money, // 因为这里是扣钱 所以存成负数
       history_balance: req.body.historybalance
    }, 
    (error,results) => {
      if (error) {
        console.log('Insert Invoice Failed!'+error);
      }else{
        console.log('Insert Invoice Succeed!');
        connection.query(
            'UPDATE Person SET balance=? WHERE person_id=?',//--------------②更新Person里的balance（减去账单的费用之后）
            [req.body.historybalance - req.body.money,
            req.body.sellerID
            ],
            (err,result) => {
                  if (err) {
                    console.log('Update Seller Balance Failed!'+err);
                  }else{
                    console.log('Update Seller Balance Succeed!');
                    res.redirect('/invoiceSuccess');
                    }
              }
            )
      }      
    }
    );

})

//--------------更换order的管理员manager--------------//
app.post('/changeManager/:id',(req,res)=>{

  var managerModSql = 'UPDATE `Order` SET manager_id=? WHERE order_id=?';
  var managerModSql_Params = [
    req.body.orderManager,
    req.params.id 
    ];
  
  connection.query(
    managerModSql, //sql语句
    managerModSql_Params, //指定如何修改
    (error,results) =>{
      if (error){
        console.log('Edit Manager failed!'+error);
      }else{
        console.log('Edit Succeed！The manager of order '+req.params.id+' has been changed!');
        res.redirect('/orderCustomer'); //重定向显示
      }
     }
    );
})
