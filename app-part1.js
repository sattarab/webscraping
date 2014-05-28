var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

url = 'http://www.tdsb.on.ca/Leadership/Trustees.aspx';

request({
  url: url,
  headers: { "Accept": "*/*", "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.146 Safari/537.36" },
}, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

        var name, ward, url, profileUrl, pictureUrl, ward;
        var json = [];
        var writeStream = fs.createWriteStream('file-1.txt'); 
        var i = 0;
        $('.TrusteeInfoContact').each(function(){
            var data = $(this);
            name = data.children('.TrusteeHeading').children('.TrusteeNameLink').text().trim(); 
            contact = data.children('.TrusteeContact').children('span').text().trim() + " " + data.children('.TrusteeContact').children('a').text().trim();
            url = data.children('.TrusteeHeading').children('a').attr('href');
            profileUrl = 'http://www.tdsb.on.ca' + url.toLowerCase() + url + '.aspx';
            pictureUrl = 'http://www.tdsb.on.ca' + data.children('.TrusteeHiRes').children('a').attr('href');
            ward = data.children('.TrusteeNumberName').first().text().trim() + " " + data.children('.wardName').first().text().trim();   
            element = {}
            element['name'] = name;
            element['contact'] = contact;
            element['profileUrl'] = profileUrl;
            element['pictureUrl'] = pictureUrl;
            element['ward'] = ward;
            json.push(element);
            writeStream.write(json[i].name + ',' + json[i].contact + ',' + json[i].profileUrl + ',' + json[i].pictureUrl + ',' +json[i].ward  + '\n');
            i++;        
        });
    }
    else{
        console.log('error: occurred');
    }
});