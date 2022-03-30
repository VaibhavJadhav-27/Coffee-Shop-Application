var Router = require('express');
const router5 = Router();

const mysqlConnection = require('../database/database');

router5.get('/', async(req, res) => {
    res.status(200).json('Server is on and database is connected..!!!');
});

router5.get('/:delivery', async(req, res) => {
    mysqlConnection.query('select * from delivery;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router5.get('/:delivery/:deliveryid', async(req, res) => {
    var deliveryid = req.params.deliveryid;
    console.log(deliveryid);
    mysqlConnection.query('select * from delivery where deliveryid=? ;', [deliveryid], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
            console.log(rows);

        } else {
            console.log(error);
        }
    });
});

router5.get('/delivery/deliveryid/:isreceived', async(req, res) => {
    var status = req.params.isreceived;
    console.log(status);
    mysqlConnection.query('select * from delivery where isreceived=? ;', [status], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
            console.log(rows);

        } else {
            console.log(error);
        }
    });
});

router5.get('/delivery/deliveryid/:custid/:isreceived', async(req, res) => {
    var status = req.params.isreceived;
    var custid = req.params.custid;
    console.log(status);
    mysqlConnection.query('select * from delivery where isreceived=? and custid=?;', [status,custid], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
            console.log(rows);

        } else {
            console.log(error);
        }
    });
});


router5.post('/:delivery', (req, res) => {
    var deliveryid = req.body.deliveryid;
    var custid = req.body.custid;
    var orderid = req.body.orderid;
    var address = req.body.address;
    var items = req.body.items;
    var totalamount = req.body.totalamount;
    var isreceived = req.body.isreceived;
    console.log(deliveryid);
    console.log(custid);
    console.log(orderid);
    console.log(address);
    console.log(items);
    console.log(totalamount);
    console.log(isreceived);
    mysqlConnection.query('insert into delivery values(?,?,?,?,?,?,?);', [deliveryid, custid, orderid, address, items, totalamount, isreceived], (error, rows, fields) => {
        if (!error) {
            //res.json({ Status: 'Customer registered ..!!' });
            res.send('Delivery record inserted successfully...!!!')

        } else {
            console.log(res.statusCode);
            console.log(error);
            res.send("Duplicate entries..!!!");
        }
    });

});

router5.put('/delivery/:deliveryid/:isreceived', (req, res) => {
    var deliveryid = req.body.deliveryid;
    var status = req.body.isreceived;
    console.log(deliveryid);
    console.log(status);
    mysqlConnection.query('update delivery set isreceived=? where deliveryid = ?', [status, deliveryid], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Menu data updated ..!!' });

        } else {
            console.log(error);
        }
    });
});


router5.delete('/delivery', (req, res) => {
    var itemname = req.body.itemname;
    console.log(custid);
    mysqlConnection.query('delete from menu where itemname =?', [itemname], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Menu item deleted ...!!' });
        } else {
            console.log(error);
        }
    });
});

module.exports = router5;