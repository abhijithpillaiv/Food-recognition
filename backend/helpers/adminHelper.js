const promise = require('promise');
var bcrypt = require('bcrypt');
var db = require('../config/connection')
var collection = require('../config/collection');
const { ObjectID } = require('bson');
const { resolve, reject } = require('promise');
const { response } = require('express');
const { student } = require('../config/collection');

module.exports = {
    // Login
    login: (adminData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            if (adminData.email == collection.adminEmail) {
                let admin = await db.get().collection(collection.admin).findOne({ email: adminData.email })
                if (admin) {
                    bcrypt.compare(adminData.password, admin.password).then((status) => {
                        if (status) {
                            console.log('login success')
                            loginStatus = true
                            resolve(loginStatus)
                        }
                        else {
                            loginStatus = false
                            resolve(loginStatus)
                        }
                    })
                } else {
                    if (adminData.password == collection.adminSecurePass) {
                        adminData.password = await bcrypt.hash(adminData.password, 10)
                        db.get().collection(collection.admin).insertOne(adminData).then(() => {
                            loginStatus = true
                            resolve(loginStatus)
                        })
                    } else {
                        loginStatus = false
                        resolve(loginStatus)
                    }
                }
            } else {
                loginStatus = false
                resolve(loginStatus)
            }
        })
    },
    //Update password
    updatePass:(id,pass)=>{
        return new promise(async (resolve, reject) => {
            var password = await bcrypt.hash(pass, 10)
            await db.get().collection(collection.user).updateOne({'_id':ObjectID(id)},
            { $set: { "password" : password } })
            resolve()
        })
    },
     // Get Admin
     getAdmin: (data) => {
        return new Promise(async (resolve, reject) => {
                let user = await db.get().collection(collection.admin).findOne({ 'email': data })
                if (user == null) {
                    resolve(false)
                }
                else {
                    resolve(user._id)
                }
        })

    },

    // Add About
    addAbout: (data) => {
        return new promise(async (resolve, reject) => {
            try {
                let about = await db.get().collection(collection.about).find().toArray()
                if (about.length != 0) {
                    db.get().collection(collection.about).updateOne({ "_id": ObjectID(data.id) }, {
                        $set: {
                            mbTitle: data.mbTitle,
                            mbDes: data.mbDes,

                            sb1Title: data.sb1Title,
                            sb1Des: data.sb1Des,

                            sb2Title: data.sb2Title,
                            sb2Des: data.sb2Des,

                            sb3Title: data.sb3Title,
                            sb3Des: data.sb3Des,
                        }
                    }).then(() => {
                        resolve("About Updated Sucessfully")
                    })
                } else {
                    db.get().collection(collection.about).insertOne(data).then(() => {
                        resolve('New About added sucessfully')
                    })
                }
            } catch (error) {
                resolve(error)
            }

        })
    },
    // Add new Item
    addItem: (data) => {
        return new promise(async (resolve, reject) => {
            try {
                db.get().collection(collection.item).insertOne(data).then((data) => {
                    resolve('Item added Sucessfully')
                })
            } catch (error) {
                resolve(error)
            }
        })
    },
    // Edit item
    EditItem: (data) => {
        return new promise(async (resolve, reject) => {
            try {
                db.get().collection(collection.item).updateOne({ "_id": ObjectID(data.id) }, {
                    $set: {
                        name: data.name,
                        price: data.price,

                        des: data.des,
                        image:data.image,
                        history: data.history,
                    }
                }).then((data) => {
                    resolve('Item updated Sucessfully')
                })
            } catch (error) {
                resolve(error)
            }
        })
    },
    //delete item
    deleteItem: (id) => {
        return new Promise(async(resolve, reject) => {
            // Remove item from cart 
           await db.get().collection(collection.cart).updateMany({"product.item":ObjectID(id)},{
                $pull: { product: { item:ObjectID(id)} }         
            })
            // Remove item
            db.get().collection(collection.item).removeOne({ _id: ObjectID(id) }).then((response) => {
                resolve("Removed Sucessfully")
            })
        })
    },

       // Purchase  History
       itemHistory: (datas) => {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var newdate = day + "/" + month + "/" + year;
        var temp={date:null,_id:null,name:null,data:{},};
        var name =''
        return new promise(async (resolve, reject) => {
            try {
                console.log(datas);
                // Insert item Purchase history
                datas.data.map((obj)=>{ db.get().collection(collection.item).updateOne({ "_id": ObjectID(obj.item) }, {
                    $push:{'history':{'date':newdate,'customerId':obj._id,'amount':obj.quantity}}
                }).then()})
                // Get Name of the user
                db.get().collection(collection.cart).findOne({'_id':ObjectID(datas.data[0]._id)}).then((res)=>{
                    db.get().collection(collection.user).findOne({'_id':ObjectID(res.user)}).then((resp)=>name=resp.name)
                })
                // Insert Purchase History
                    temp.name=name
                    temp.date=newdate;
                    temp.data=datas
                db.get().collection(collection.purchase).insertOne(temp).then()
                //Remove cart
                db.get().collection(collection.cart).removeOne({_id:ObjectID(datas.data[0]._id)}).then()
                
                resolve()
            } catch (error) {
                resolve(error)
            }
        })
    },

    // Get Message
    getMessage: () => {
        return new promise(async (resolve, reject) => {
            let message = await db.get().collection(collection.message).find().toArray()
            resolve(message)
        })
    },
    dltMsg: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.message).removeOne({ _id: ObjectID(id) }).then((response) => {
                resolve("Removed Sucessfully")
            })
        })
    },

    // Get User
    getUser: () => {
        return new promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.user).find().toArray()
            resolve(user)
        })
    },
      // Get One User
      getOneUser: (id) => {
        return new promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.user).findOne({'_id':ObjectID(id)})
            resolve(user)
        })
    },
          // Delete User
          deleteUser: (id) => {
            return new promise(async (resolve, reject) => {
                await db.get().collection(collection.user).removeOne({'_id':ObjectID(id)}).then((resolve()))
                
            })
        },

    // Get Orders
    getOrders: () => {
        return new promise(async (resolve, reject) => {
            let order = await db.get().collection(collection.order).find().toArray()
            resolve(order)
        })
    },

    // Get Purchase details
    getpurchase: () => {
        return new promise(async (resolve, reject) => {
            let data = await db.get().collection(collection.purchase).find().toArray()
            resolve(data)
        })
    },

    // dashboard
    dashboard:()=>{
        data={product:0,users:0,recipes:0}
        return new promise(async (resolve, reject) => {
            data.product = await db.get().collection(collection.item).find().count()
            data.users = await db.get().collection(collection.user).find().count()
            data.recipes = await db.get().collection(collection.recipes).find().count()
            resolve(data) 
        })
    },
    updatePass:(id,pass)=>{
        return new promise(async (resolve, reject) => {
            var password = await bcrypt.hash(pass, 10)
            await db.get().collection(collection.admin).updateOne({'_id':ObjectID(id)},
            { $set: { "password" : password } })
            resolve()
        })
    },

}