require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const Request_service = require("../models/RequestServiceModule");

exports.insert_Request = (req, res, next) => {
  Request_service.find({ email: req.body.email })
    .exec()
    .then((request) => {
      if (request.length < 1) {
        return new Request_service({
          _id: new mongoose.Types.ObjectId(),

          FName: req.body.FName,
          LName: req.body.LName,
          email: req.body.email,
          serviceName: req.body.serviceName,
          District: req.body.District,
          Date: req.body.Date,
          Month: req.body.Month,
          Year: req.body.Year,
          Latitude: req.body.Latitude,
          Longitude: req.body.Longitude,
        })
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "requeRequest_servicest created",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
      const error = new Error();
      error.message = "requeRequest_servicest Exists!";
      throw error;
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAll_Request = (req, res, next) => {
  Request_service.find({}, (error, data) => {
    if (error) {
      console.log("data of blood band not found");
    } else {
      // console.log(data);
      res.status(200).json(data);
    }
  });
};

exports.get_Request_byDate = (req, res, next) => {
    console.log("this is date")
    console.log(req.body.date);
    Request_service.find({Date : {$gt : req.body.date, $lte : new Date()}}, (error, data) => {
      if (error) {
        console.log("data of blood band not found");
      } else {
        // console.log(data);
        res.status(200).json(data);
      }
    });
  };
