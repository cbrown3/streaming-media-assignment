const http = require('http');
const htmlHandler = require('./htmlResponse.js');
const mediaHandler = require('./mediaResponse.js');

const port = process.env.PORT || process.env.NODE_PORT || 5384;

const onRequest = (request, response) => {
    console.log(request.url);
    
    switch (request.url) {
        case '/':
            htmlHandler.getIndex(request, response);
            break;
        case '/page2':
            htmlHandler.getPage2(request, response);
            break;
        case '/page3':
            htmlHandler.getPage3(request, response);
            break;
        case '/party.mp4':
            mediaHandler.getParty(request, response);
            break;
        case '/bling.mp3':
            mediaHandler.getBling(request, response);
            break;
        case '/bird.mp4':
            mediaHandler.getBird(request, response);
            break;
        default:
            htmlHandler.getIndex(request, response);
            break;
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);