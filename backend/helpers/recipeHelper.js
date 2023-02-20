const promise = require('promise');
var bcrypt = require('bcrypt');
var db =require('../config/connection')
var collection=require('../config/collection');
const { ObjectID } = require('bson');
const { resolve, reject } = require('promise');
const { response } = require('express');

module.exports={
    // Add Recipe
    addRecipes:(data)=>{
        return new promise(async(resolve,reject)=>{
            db.get().collection(collection.recipes).insertOne(data).then((data)=>{
                resolve(data.ops[0])
            })
        })
    },
    // Edit Recipee
    editRecipe: (data) => {
        return new promise(async (resolve, reject) => {
            try {
                db.get().collection(collection.recipes).updateOne({ "_id": ObjectID(data.id) }, {
                    $set: {
                        title: data.title,
                        serves: data.serves,

                        ingredients: data.ingredients,
                        preparation:data.preparation,
                        image: data.image,
                    }
                }).then((data) => {
                    resolve('Item updated Sucessfully')
                })
            } catch (error) {
                resolve(error)
            }
        })
    },
    //delete Recipe
    deleteRecipe: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.recipes).removeOne({ _id: ObjectID(id) }).then((response) => {
                resolve("Removed Sucessfully")
            })
        })
    },
    // Get Recipes
    getRecipes: () => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.recipes).find().toArray().then((data) => {
                resolve(data)
            })
        })
    },
    getSingleRecipes: (id) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.recipes).findOne({"_id":ObjectID(id)}).then((data) => {
                console.log(data);
                resolve(data)
            })
        })
    },
}