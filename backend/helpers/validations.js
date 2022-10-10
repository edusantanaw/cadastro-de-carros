const ObjectId = require('mongoose').Types.ObjectId

const existsOrError = (value, msg) => {
    if(!value) throw msg
    if(Array.isArray(value) && value.length === 0 ) throw msg
 } 

 const validString = (value, msg) => {
    const regex = /^[A-z]+$/
    if(!(regex.test(value))) throw msg
 }
 const validId = id => {
    if(!ObjectId.isValid(id)) throw 'id invalido!'
 } 

 module.exports = {existsOrError, validString, validId}