function loadText() {
    redrawPreview();
}

function updateText() {
    redrawPreview();
}

function updatePage() {
    page = document.getElementById('page').value.padStart(2, '0').toUpperCase();
}

function redrawPreview() {
    var x = 0;
    var y = 0;
    
    var message = document.getElementById('message').value;
    
    context.clearRect(0, 0, previewWidth, previewHeight);
    data = [...Array(32)].map(e => Array(32).fill(0x2DF));
    
    for (var i=0; i<message.length; i++) {
        var chr = message[i];
        if (chr=='\n') {
            x = 0;
            y+=2;            
            if (y>32) break;
            continue;
        }
        if (chr in alphabet) {
            if (x<32) {
                placeTile(x,y,alphabet[chr]);
                data[x][y] = 0x280 + alphabet[chr];
                placeTile(x,y+1,alphabet[chr]+16);
                data[x][y+1] = 0x280 + alphabet[chr]+16;
                
            }
            x++;
        }
    }
    
}

function placeTile(x, y, tile) {
    var xpos = x*tileWidth;
    var ypos = y*tileHeight;
    
    var xs = tile%16;
    var ys = Math.floor(tile/16);
    
    var xspos = xs*tileWidth;
    var yspos = ys*tileHeight;
    
    context.clearRect(xpos, ypos, tileWidth, tileHeight);
    context.drawImage(tiles, xspos, yspos, tileWidth, tileHeight, xpos, ypos, tileWidth, tileHeight);
}

function map16(number) {
    return number.toString(16).padStart(3, '0').toUpperCase();
}

function generateText() {
    var text = "";
    
    for (var i=0; i<256; i++) {
        var tile = (page + i.toString(16).padStart(2, '0')).toUpperCase();
        var x = i%16;
        var y = Math.floor(i/16);
        tile += ": 0025 { ";
        tile += map16(data[x*2][y*2]) + " 1 ---  ";
        tile += map16(data[x*2][y*2+1]) + " 1 ---  ";
        tile += map16(data[x*2+1][y*2]) + " 1 ---  ";
        tile += map16(data[x*2+1][y*2+1]) + " 1 --- ";
        tile += "}\r\n";        
        text += (tile);
        
        
    }
    
    
    return text;
}

function exportText() {
    var text = generateText();
    var filename = "page_"+page+".txt";
    
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

var alphabet = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7,
    'I': 8,
    'J': 9,
    'K': 10,
    'L': 11,
    'M': 12,
    'N': 13,
    'O': 14,
    'P': 15,
    'Q': 16+16,
    'R': 17+16,
    'S': 18+16,
    'T': 19+16,
    'U': 20+16,
    'V': 21+16,
    'W': 22+16,
    'X': 23+16,
    'Y': 24+16,
    'Z': 25+16,
    
    
    'a': 48+16,
    'b': 49+16,
    'c': 50+16,
    'd': 51+16,
    'e': 52+16,
    'f': 53+16,
    'g': 54+16,
    'h': 55+16,
    'i': 56+16,
    'j': 57+16,
    'k': 58+16,
    'l': 59+16,
    'm': 60+16,
    'n': 61+16,
    'o': 62+16,
    'p': 63+16,
    'q': 64+32,
    'r': 65+32,
    's': 66+32,
    't': 67+32,
    'u': 68+32,
    'v': 69+32,
    'w': 70+32,
    'x': 71+32,
    'y': 72+32,
    'z': 73+32,
    
    ' ': 127-16
    
}