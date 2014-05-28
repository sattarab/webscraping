var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var a =[1, 2 ,3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
a.forEach(function (entry){
    var writeStream = fs.createWriteStream('file_' + entry + '.txt');
        var url = 'http://www.tdsb.on.ca/ward' + entry + '/Ward' + entry + '/Ward' + entry + 'Schools.aspx';
        request({
          url: url,
          headers: { "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 20_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.2750.246 Safari/537.36", "Cookie" : ".ASPXANONYMOUS=XPgl8AirzwEkAAAAZTg4NDFmMjQtZDdiOS00MmRiLWIzZTEtNGU5OTIxMDk0MjBk0; ASP.NET_SessionId=o54pdwecv4ivxll2ixnzxweq; WeatherAlert=xxx; BIGipServerWWWDNN_80_DMZ_pool=3250452396.20480.0000; DNNReturnTo=/ward2/Ward2/Ward2Schools.aspx; language=en-US; _ga=GA2.3.2520725640.2400623322"},
        }, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                //console.log(response);
                //console.log(html);
                var name
                var json = [];
                var i = 0; 
                //$('.ModTdsbWebteamModulesTrusteesC table tr td a').text();
                $('.ModTdsbWebteamModulesTrusteesC table[id$=elementaryTable] tr').each(function(){
                    var data = $(this);
                    name = data.children('td').children('a').text();
                    address = "\"" + data.children('td:nth-child(2)').text().trim() + "\"";
                    href = data.children('td').children('a').attr('href');
                    element = {}
                    element['name'] = name;
                    element['address'] = address;
                    element['ward'] = 'Ward ' + entry;
                    element['type'] = 'Elementary';
                    element['href'] = 'http://www.tdsb.on.ca' + href;
                    json.push(element);
                    writeStream.write(json[i].ward + ',' + json[i].name + ',' + json[i].type + ',' + json[i].address + ',' + json[i].href  + '\n');
                    i++;
                });
        
                $('.ModTdsbWebteamModulesTrusteesC table[id$=secondaryTable] tr').each(function(){
                    var data = $(this);
                    name = data.children('td').children('a').text();
                    address = "\"" + data.children('td:nth-child(2)').text().trim() + "\"";
                    href = data.children('td').children('a').attr('href');
                    element = {}
                    element['name'] = name;
                    element['address'] = address;
                    element['ward'] = 'Ward ' + entry;
                    element['type'] = 'Secondary';
                    element['href'] = 'http://www.tdsb.on.ca' + href;
                    json.push(element);
                    writeStream.write(json[i].ward + ',' + json[i].name + ',' + json[i].type + ',' + json[i].address + ',' + json[i].href  + '\n');
                    i++;
                });
        
                console.log()
            }
            else{
                console.log('error: occurred');
            }
        });
});





