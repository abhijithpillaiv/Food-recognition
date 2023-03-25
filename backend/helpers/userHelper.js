const promise = require('promise');
var db = require('../config/connection')
var bcrypt = require('bcrypt');
var collection = require('../config/collection');
const { ObjectID } = require('bson');
const { resolve, reject } = require('promise');
const { response } = require('express');
var healthHelper=require('./healthHelper')
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
     //getUser
     geteUser: (userData) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.user).findOne({'_id':ObjectID(userData) })
            if (user) {
                console.log(user);
               resolve(user)
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
    // Intake
    addIntake:(data)=>{
        return new promise(async (resolve,reject)=>{
            await db.get().collection(collection.intake).insertOne(data).then((data)=>{
                resolve(data)
            })
        })
    },
    updateIntake:(data)=>{
        return new promise(async (resolve,reject)=>{
            await db.get().collection(collection.intake).updateOne({'_id':ObjectID(data.id)},
            {$set:{"calorie":data.calorie}})

        })
    },
    // Account Details
    getDetails:(id)=>{
        return new promise(async (resolve,reject)=>{
            await db.get().collection(collection.profile).findOne({ 'id': id}).then((data)=>{
                resolve(data)
            })
        })
    },
    setDetails:(data)=>{
        return new promise(async (resolve,reject)=>{
            var details = await healthHelper.getData(data)
            data.data=details
            var user=await db.get().collection(collection.profile).findOne({ 'id': data.id})
                if (user) {
                    await db.get().collection(collection.profile).deleteOne({ 'id': data.id})
                    await db.get().collection(collection.profile).insertOne(data).then((data)=>{
                        resolve(data)
                    })
                }else{
                    await db.get().collection(collection.profile).insertOne(data).then((data)=>{
                        resolve(data)
                    }) 
                }           
        })
    }
}