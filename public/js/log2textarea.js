(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Log2textarea = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**                                                                                       * Module Log2textarea
* @module Log2textarea
*/
'use strict';

module.exports = class Log2textarea {


/**
Init 
@alias module:Log2textarea
@param {string}  - BOM ID
@param {string}  - Start Message
@param {boolean} - true or false to clean message obx
@returns {boolean} - void
@example 
* var log = new Log2textarea("fooid","...start planning module");
*/

   constructor(_id, start_msg='...start logging to Textarea with ID: ' + _id + '\n', clear=true)
   {
     this.log = document.querySelector("#"+_id);
     if(!this.log)
     {
       this.log = document.createElement('TEXTAREA');
     }

     if(clear)
     {
       this.clear();
     }

     this.info(start_msg);
   }

/**
@alias module:Log2textarea
@param {string}  - string message
@returns {bolean} - nonting
@example 
* var log = new Log2textarea("fooid","...start planning module");
* log.info("get data from: http://foobar.com");
*/
   async info(s)
   {
     if(this.log)
     {
       let t = this.log.value + "\n" + s; 
       this.log.value= t;
       this.log.scrollTop = this.log.scrollHeight;
     }
   }

/**
@alias module:Log2textarea
@returns {bolean} - void
@example 
* var log = new Log2textarea("fooid","...start planning module");
* log.clear();
*/
   async clear()
   {
     if(this.log)
     {
       this.log.value= '';
       this.log.scrollTop = this.log.scrollHeight;
     }
   }



};


},{}]},{},[1])(1)
});
