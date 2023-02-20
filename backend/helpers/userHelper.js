const promise = require('promise');
var db = require('../config/connection')
var bcrypt = require('bcrypt');
var collection = require('../config/collection');
const { ObjectID } = require('bson');
const { resolve, reject } = require('promise');
const { response } = require('express');

module.exports = {


    //Login
    login: (userData) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.user).findOne({ email: userData.email })
            if (user) {
                console.log('user found');
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log('authentication success');
                        resolve(user)
                    }
                    else {
                        resolve(false)
                    }
                })
            } else {
                resolve(false)
            }
        })
    },
    // Signup
    signup: (userData) => {
        return new Promise(async (resolve, reject) => {
            if (userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10)
                userData.logstatus=true
                userData.guest=false
                db.get().collection(collection.user).insertOne(userData).then((data) => {
                    resolve(data.ops[0]._id)
                })
            }else{
                var data={name:null,ipId:null,logstatus: true,guest:true}
                data.name='Guest'+userData
                data.ipId=userData
                db.get().collection(collection.user).insertOne(data).then((data) => {
                    resolve(data.ops)
                })
            }

        })
    },
    // Check for user
    checkUser: (data, isIp) => {
        return new Promise(async (resolve, reject) => {
            if (isIp) {
                let user = await db.get().collection(collection.user).findOne({ 'ipId': data })
                if (user == null) {
                    resolve(false)
                }
                else {
                    resolve(user._id)
                }
            } else {
                let user = await db.get().collection(collection.user).findOne({ 'email': data })
                if (user == null) {
                    resolve(false)
                }
                else {
                    resolve(user._id)
                }
            }
        })

    },
    updatePass:(id,pass)=>{
        return new promise(async (resolve, reject) => {
            var password = await bcrypt.hash(pass, 10)
            await db.get().collection(collection.user).updateOne({'_id':ObjectID(id)},
            { $set: { "password" : password } })
            resolve()
        })
    },

    // About
    getAbout: () => {
        return new promise(async (resolve, reject) => {
            let about = await db.get().collection(collection.about).find().toArray()
            resolve(about)
        })
    },

    // Get Items
    getItems: () => {
        return new promise(async (resolve, reject) => {
            let item = await db.get().collection(collection.item).find().toArray()
            resolve(item)
        })
    },

    // Set message
    setMessage: (data) => {
        return new promise(async (resolve, reject) => {
            db.get().collection(collection.message).insertOne(data).then(() => {
                resolve('Message sent sucessfully')
            })
        })
    },

    // Cart
    addToCart: (proId, userId) => {
        let proObj = {
            item: ObjectID(proId),
            quantity: 1
        }
        return new Promise(async (resolve, reject) => {
            let userCart = await db.get().collection(collection.cart).findOne({ user: ObjectID(userId) })

            if (userCart) {
                let proExist = userCart.product.findIndex(products => products.item == proId)
                console.log(proExist);

                if (proExist != -1) {
                    db.get().collection(collection.cart).updateOne({ user: ObjectID(userId), 'product.item': ObjectID(proId) },
                        {
                            $inc: { 'product.$.quantity': 1 }
                        }).then((response) => {
                            resolve()
                        })
                } else {
                    db.get().collection(collection.cart).updateOne({ user: ObjectID(userId) },
                        {
                            $push: { product: proObj }
                        }).then((response) => {
                            resolve()
                        })
                }

            } else {
                let cartObj = {
                    user: ObjectID(userId),
                    product: [proObj]
                }
                db.get().collection(collection.cart).insertOne(cartObj).then((response) => {
                    resolve()
                })
            }
        })
    },
    getCartProduct: (userId) => {
        return new Promise(async (resolve, reject) => {
            let cartItems = await db.get().collection(collection.cart).aggregate([
                {
                    $match: { user: ObjectID(userId) }
                },
                {
                    $unwind: '$product'
                },
                {
                    $project: {
                        item: '$product.item',
                        quantity: '$product.quantity'

                    }
                },
                {
                    $lookup: {
                        from: collection.item,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'products'
                    }
                },
                // {
                //     $project: {
                //         item: 1, quantity: 1, products: { $arrayElemAt: ['$products', 0] }
                //     }
                // },
                // {
                //   $lookup: {
                //     from: collection.cart, //refer
                //        let: { proList: '$product.item' },//
                //        pipeline: [
                //            {
                //                $match: {
                //                    $expr: {
                //                        $in: ['$_id', "$$proList"]
                //                    }
                //                }
                //            }
                //        ],
                //        as: 'cartItems'
                //    }
                // }
            ]).toArray()
            console.log(cartItems);
            resolve(cartItems)
        })
    },
    getCartCount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let count = 0
            let cart = await db.get().collection(collection.cart).findOne({ _id: ObjectID(userId) })
            if (cart) {
                count = cart.product.length
            }
            resolve(count)
        })
    },
    PrdtQuantity: (details) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.cart).updateOne({ _id: ObjectID(details.cartid), 'product.item': ObjectID(details.prdtid) },
                {
                    $set: { 'product.$.quantity': details.count }

                }).then(() => {
                    resolve(true)
                })
        })
    },
    deletePrdt: (Cartid, prdtid) => {
        return new Promise((resolve, reject) => {
        db.get().collection(collection.cart).updateOne({ _id: ObjectID(Cartid) },
            {
                $pull: { product: { item: ObjectID(prdtid) } }
            }).then(() => {
                resolve('done')
            })
        })
    },
}