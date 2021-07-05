const express = require('express');
const validator = require('validator');
/* Obtener usuarios por su ID */
const rendererror = (err,res,req) => {
  // set locals, only providing error in development

  // render the error page
  let statusCode = 500;
  if(err.code) statusCode = err.code;
  res.status(statusCode);
  res.json({"code":statusCode,"response":err.message,"error":err.stack});
};

const rendererror_req = (err,res,req) => {
  // set locals, only providing error in development

  // render the error page
  res.status(401);
  res.json({"code":401,"title":"Error","response":"wrong parameters","error":"Specifically the parameters are not sent: ['"+err+"']"});
};

const validateReq = (req,prop) => {
  data = "all";
  if(req){
    prop.forEach(key => {
      for(var value in key){
        for(var llav in req.body){
          if(req.body[value] && (req.body[value] !== null)  && (req.body[value] !== undefined)){
            if(ValidatorParam(req.body[value],key[value]) == true){
              data = true;
            }else{
             data = value +" is not " + key[value];
             return data;
            }
          }else{
            data = value;
            return data;
          }
        }
      }
    })
  }
  return data;
};

const ValidatorParam = (value,type) =>{
  response = false;
  switch (type) {
    case "email":
        if(validator.isEmail(value) && value.length<=200){
          response = true;
        }
      break;
    case "date":
        if(validator.isDate(value)&& value.length<=200){
          response = true;
        }
      break;
    case "number":
        if(validator.isNumeric(value)&& value.length<=200){
          response = true;
        }
      break;
    case "string":
        if(validator.isAlpha(value)&& value.length<=200){
          response = true;
        }
      break;
    case "all":
      if(value.length<=200){
        response = true;
      }
      break;
  }
    return response;
}

module.exports = {
    rendererror: rendererror,
    rendererror_req:rendererror_req,
    validateReq:validateReq
}