const fs = require('fs');
const path = require('path');

const loadFile = (request, response, directory, fileType) => {
     const file = path.resolve(__dirname, directory);
    
    fs.stat(file, (err, stats) => {
        if(err) {
            if (err.code === 'ENOENT') {
                response.writeHead(404);
            }
            return response.end(err);
        }
        
        let range = request.headers.range;
        
        if(!range) {
            range = 'bytes=0-';
        }
        
        const positions = range.replace(/bytes=/, '').split('-');
        
        let start = parseInt(positions[0], 10);
        
        const total = stats.size;
        const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        
        if(start > end) {
            start = end - 1;
        }
        
        const chunksize = (end -start) + 1;
        
        response.writeHead(206, {
            'Content-Range': `bytes ${start} - ${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': fileType,
        });
        
        const stream = fs.createReadStream(file, {start, end});
        
        stream.on('open', () => {
            stream.pipe(response);
        });
        
        stream.on('error', () => {
            stream.pipe(responseErr);
        });
        
        return stream;
    });
};

const getParty = (request, response) => {
  loadFile(request, response, '../client/party.mp4', 'video/mp4');  
};

const getBling = (request, response) => {
  loadFile(request, response, '../client/bling.mp3', 'audio/mpeg');  
};

const getBird = (request, response) => {
  loadFile(request, response, '../client/bird.mp4', 'video/mp4');  
};

module.exports.getParty = getParty;
module.exports.getBling = getBling;
module.exports.getBird = getBird;