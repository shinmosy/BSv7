import axios from 'axios'
import cheerio from 'cheerio'
import fetch from 'node-fetch'

class Lunicode {
    constructor() {
        this.tools = {
            flip: {
                init: function() {
                    for (var i in this.map) {
                        this.map[this.map[i]] = i;
                    }
                },
                encode: function(text) {
                    var ret = [],
                        ch;
                    for (var i = 0, len = text.length; i < len; i++) {
                        ch = text.charAt(i);
                        if (i > 0 && (ch == '\u0324' || ch == '\u0317' || ch == '\u0316' || ch == '\u032e')) {
                            ch = this.map[text.charAt(i - 1) + ch];
                            ret.pop();
                        } else {
                            ch = this.map[ch];
                            if (typeof(ch) == "undefined") {
                                ch = text.charAt(i);
                            }
                        }
                        ret.push(ch);
                    }
                    return ret.reverse().join("");
                },
                decode: function(text) {
                    var ret = [],
                        ch;
                    for (var i = 0, len = text.length; i < len; i++) {
                        ch = text.charAt(i);
                        if (i > 0 && (ch == '\u0324' || ch == '\u0317' || ch == '\u0316' || ch == '\u032e')) {
                            ch = this.map[text.charAt(i - 1) + ch];
                            ret.pop();
                        } else {
                            ch = this.map[ch];
                            if (typeof(ch) == "undefined") {
                                ch = text.charAt(i);
                            }
                        }
                        ret.push(ch);
                    }
                    return ret.reverse().join("");
                },
                map: {
                    'a': '\u0250',
                    'b': 'q',
                    'c': '\u0254',
                    'd': 'p',
                    'e': '\u01DD',
                    'f': '\u025F',
                    'g': '\u0253',
                    'h': '\u0265',
                    'i': '\u0131',
                    'j': '\u027E',
                    'k': '\u029E',
                    'l': '\u006C',
                    'm': '\u026F',
                    'n': 'u',
                    'r': '\u0279',
                    't': '\u0287',
                    'v': '\u028C',
                    'w': '\u028D',
                    'y': '\u028E',
                    'A': '\u2200',
                    'B': 'á™ ',
                    'C': '\u0186',
                    'D': 'á—¡',
                    'E': '\u018e',
                    'F': '\u2132',
                    'G': '\u2141',
                    'J': '\u017f',
                    'K': '\u22CA',
                    'L': '\u02e5',
                    'M': 'W',
                    'P': '\u0500',
                    'Q': '\u038C',
                    'R': '\u1D1A',
                    'T': '\u22a5',
                    'U': '\u2229',
                    'V': '\u039B',
                    'Y': '\u2144',
                    '1': '\u21c2',
                    '2': '\u1105',
                    '3': '\u0190',
                    '4': '\u3123',
                    '5': '\u078e',
                    '6': '9',
                    '7': '\u3125',
                    '&': '\u214b',
                    '.': '\u02D9',
                    '"': '\u201e',
                    ';': '\u061b',
                    '[': ']',
                    '(': ')',
                    '{': '}',
                    '?': '\u00BF',
                    '!': '\u00A1',
                    "\'": ',',
                    '<': '>',
                    '\u203E': '_',
                    '\u00AF': '_',
                    '\u203F': '\u2040',
                    '\u2045': '\u2046',
                    '\u2234': '\u2235',
                    '\r': '\n',
                    'ÃŸ': 'á™ ',
                    '\u0308': '\u0324',
                    'Ã¤': 'É' + '\u0324',
                    'Ã¶': 'o' + '\u0324',
                    'Ã¼': 'n' + '\u0324',
                    'Ã„': '\u2200' + '\u0324',
                    'Ã–': 'O' + '\u0324',
                    'Ãœ': '\u2229' + '\u0324',
                    'Â´': ' \u0317',
                    'Ã©': '\u01DD' + '\u0317',
                    'Ã¡': '\u0250' + '\u0317',
                    'Ã³': 'o' + '\u0317',
                    'Ãº': 'n' + '\u0317',
                    'Ã‰': '\u018e' + '\u0317',
                    'Ã': '\u2200' + '\u0317',
                    'Ã“': 'O' + '\u0317',
                    'Ãš': '\u2229' + '\u0317',
                    '`': ' \u0316',
                    'Ã¨': '\u01DD' + '\u0316',
                    'Ã ': '\u0250' + '\u0316',
                    'Ã²': 'o' + '\u0316',
                    'Ã¹': 'n' + '\u0316',
                    'Ãˆ': '\u018e' + '\u0316',
                    'Ã€': '\u2200' + '\u0316',
                    'Ã’': 'O' + '\u0316',
                    'Ã™': '\u2229' + '\u0316',
                    '^': ' \u032E',
                    'Ãª': '\u01DD' + '\u032e',
                    'Ã¢': '\u0250' + '\u032e',
                    'Ã´': 'o' + '\u032e',
                    'Ã»': 'n' + '\u032e',
                    'ÃŠ': '\u018e' + '\u032e',
                    'Ã‚': '\u2200' + '\u032e',
                    'Ã”': 'O' + '\u032e',
                    'Ã›': '\u2229' + '\u032e'
                }
            },
            mirror: {
                init: function() {
                    for (var i in this.map) {
                        this.map[this.map[i]] = i;
                    }
                },
                encode: function(text) {
                    var ret = [],
                        ch, newLines = [];
                    for (var i = 0, len = text.length; i < len; i++) {
                        ch = text.charAt(i);
                        if (i > 0 && (ch == '\u0308' || ch == '\u0300' || ch == '\u0301' || ch == '\u0302')) {
                            ch = this.map[text.charAt(i - 1) + ch];
                            ret.pop();
                        } else {
                            ch = this.map[ch];
                            if (typeof(ch) == "undefined") {
                                ch = text.charAt(i);
                            }
                        }
                        if (ch == '\n') {
                            newLines.push(ret.reverse().join(""));
                            ret = [];
                        } else {
                            ret.push(ch);
                        }
                    }
                    newLines.push(ret.reverse().join(""));
                    return newLines.join("\n");
                },
                decode: function(text) {
                    var ret = [],
                        ch, newLines = [];
                    for (var i = 0, len = text.length; i < len; i++) {
                        ch = text.charAt(i);
                        if (i > 0 && (ch == '\u0308' || ch == '\u0300' || ch == '\u0301' || ch == '\u0302')) {
                            ch = this.map[text.charAt(i - 1) + ch];
                            ret.pop();
                        } else {
                            ch = this.map[ch];
                            if (typeof(ch) == "undefined") {
                                ch = text.charAt(i);
                            }
                        }
                        if (ch == '\n') {
                            newLines.push(ret.reverse().join(""));
                            ret = [];
                        } else {
                            ret.push(ch);
                        }
                    }
                    newLines.push(ret.reverse().join(""));
                    return newLines.join("\n");
                },
                map: {
                    'a': 'É’',
                    'b': 'd',
                    'c': 'É”',
                    'e': 'É˜',
                    'f': 'áŽ¸',
                    'g': 'Ç«',
                    'h': 'Êœ',
                    'j': 'êž',
                    'k': 'Êž',
                    'l': '|',
                    'n': 'á´Ž',
                    'p': 'q',
                    'r': 'É¿',
                    's': 'ê™…',
                    't': 'Æš',
                    'y': 'Ê',
                    'z': 'Æ¹',
                    'B': 'á™ ',
                    'C': 'Æ†',
                    'D': 'á—¡',
                    'E': 'ÆŽ',
                    'F': 'êŸ»',
                    'G': 'áŽ®',
                    'J': 'á‚±',
                    'K': 'â‹Š',
                    'L': 'â…ƒ',
                    'N': 'Í¶',
                    'P': 'êŸ¼',
                    'Q': 'á»Œ',
                    'R': 'Ð¯',
                    'S': 'ê™„',
                    'Z': 'Æ¸',
                    '1': '',
                    '2': '',
                    '3': '',
                    '4': '',
                    '5': '',
                    '6': '',
                    '7': '',
                    '&': '',
                    ';': '',
                    '[': ']',
                    '(': ')',
                    '{': '}',
                    '?': 'â¸®',
                    '<': '>',
                    'Ã¤': 'É’' + '\u0308',
                    'ÃŸ': 'á™ ',
                    'Â´': '`',
                    'Ã©': 'É˜' + '\u0300',
                    'Ã¡': 'É’' + '\u0300',
                    'Ã³': 'Ã²',
                    'Ãº': 'Ã¹',
                    'Ã‰': 'ÆŽ' + '\u0300',
                    'Ã': 'Ã€',
                    'Ã“': 'Ã’',
                    'Ãš': 'Ã™',
                    '`': 'Â´',
                    'Ã¨': 'É˜' + '\u0301',
                    'Ã ': 'É’' + '\u0301',
                    'Ãˆ': 'ÆŽ' + '\u0301',
                    'Ãª': 'É˜' + '\u0302',
                    'Ã¢': 'É’' + '\u0302',
                    'ÃŠ': 'ÆŽ' + '\u0302',
                    'Ã˜': 'á´“',
                    'Ã¸': 'á´“'
                }
            },
            creepify: {
                init: function() {
                    for (var i = 768; i <= 789; i++) {
                        this.diacriticsTop.push(String.fromCharCode(i));
                    }
                    for (var i = 790; i <= 819; i++) {
                        if (i != 794 && i != 795) {
                            this.diacriticsBottom.push(String.fromCharCode(i));
                        }
                    }
                    this.diacriticsTop.push(String.fromCharCode(794));
                    this.diacriticsTop.push(String.fromCharCode(795));
                    for (var i = 820; i <= 824; i++) {
                        this.diacriticsMiddle.push(String.fromCharCode(i));
                    }
                    for (var i = 825; i <= 828; i++) {
                        this.diacriticsBottom.push(String.fromCharCode(i));
                    }
                    for (var i = 829; i <= 836; i++) {
                        this.diacriticsTop.push(String.fromCharCode(i));
                    }
                    this.diacriticsTop.push(String.fromCharCode(836));
                    this.diacriticsBottom.push(String.fromCharCode(837));
                    this.diacriticsTop.push(String.fromCharCode(838));
                    this.diacriticsBottom.push(String.fromCharCode(839));
                    this.diacriticsBottom.push(String.fromCharCode(840));
                    this.diacriticsBottom.push(String.fromCharCode(841));
                    this.diacriticsTop.push(String.fromCharCode(842));
                    this.diacriticsTop.push(String.fromCharCode(843));
                    this.diacriticsTop.push(String.fromCharCode(844));
                    this.diacriticsBottom.push(String.fromCharCode(845));
                    this.diacriticsBottom.push(String.fromCharCode(846));
                    this.diacriticsTop.push(String.fromCharCode(848));
                    this.diacriticsTop.push(String.fromCharCode(849));
                    this.diacriticsTop.push(String.fromCharCode(850));
                    this.diacriticsBottom.push(String.fromCharCode(851));
                    this.diacriticsBottom.push(String.fromCharCode(852));
                    this.diacriticsBottom.push(String.fromCharCode(853));
                    this.diacriticsBottom.push(String.fromCharCode(854));
                    this.diacriticsTop.push(String.fromCharCode(855));
                    this.diacriticsTop.push(String.fromCharCode(856));
                    this.diacriticsBottom.push(String.fromCharCode(857));
                    this.diacriticsBottom.push(String.fromCharCode(858));
                    this.diacriticsTop.push(String.fromCharCode(859));
                    this.diacriticsBottom.push(String.fromCharCode(860));
                    this.diacriticsTop.push(String.fromCharCode(861));
                    this.diacriticsTop.push(String.fromCharCode(861));
                    this.diacriticsBottom.push(String.fromCharCode(863));
                    this.diacriticsTop.push(String.fromCharCode(864));
                    this.diacriticsTop.push(String.fromCharCode(865));
                },
                encode: function(text) {
                    var newText = '',
                        newChar;
                    for (var i in text) {
                        newChar = text[i];
                        if (this.options.middle) {
                            newChar += this.diacriticsMiddle[Math.floor(Math.random() * this.diacriticsMiddle.length)]
                        }
                        if (this.options.top) {
                            var diacriticsTopLength = this.diacriticsTop.length - 1;
                            for (var count = 0, len = this.options.maxHeight - Math.random() * ((this.options.randomization / 100) * this.options.maxHeight); count < len; count++) {
                                newChar += this.diacriticsTop[Math.floor(Math.random() * diacriticsTopLength)]
                            }
                        }
                        if (this.options.bottom) {
                            var diacriticsBottomLength = this.diacriticsBottom.length - 1;
                            for (var count = 0, len = this.options.maxHeight - Math.random() * ((this.options.randomization / 100) * this.options.maxHeight); count < len; count++) {
                                newChar += this.diacriticsBottom[Math.floor(Math.random() * diacriticsBottomLength)]
                            }
                        }
                        newText += newChar;
                    }
                    return newText;
                },
                decode: function(text) {
                    var newText = '',
                        charCode;
                    for (var i in text) {
                        charCode = text[i].charCodeAt(0);
                        if (charCode < 768 || charCode > 865) {
                            newText += text[i];
                        }
                    }
                    return newText;
                },
                diacriticsTop: [],
                diacriticsMiddle: [],
                diacriticsBottom: [],
                options: {
                    top: true,
                    middle: true,
                    bottom: true,
                    maxHeight: 15,
                    randomization: 100
                }
            },
            bubbles: {
                init: function() {
                    for (var i = 49; i <= 57; i++) {
                        this.map[String.fromCharCode(i)] = String.fromCharCode(i + 9263);
                    }
                    this.map['0'] = '\u24ea';
                    for (var i = 65; i <= 90; i++) {
                        this.map[String.fromCharCode(i)] = String.fromCharCode(i + 9333);
                    }
                    for (var i = 97; i <= 122; i++) {
                        this.map[String.fromCharCode(i)] = String.fromCharCode(i + 9327);
                    }
                    for (var i in this.map) {
                        this.mapInverse[this.map[i]] = i;
                    }
                },
                encode: function(text) {
                    var ret = "",
                        ch, first = true;
                    for (var i in text) {
                        ch = this.map[text[i]];
                        if ((typeof(ch) == "undefined")) {
                            if (text[i].charCodeAt(0) >= 33) {
                                ch = text[i] + String.fromCharCode(8413);
                                if (!first) {
                                    ch = String.fromCharCode(8239) + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(8239) + ch;
                                }
                            } else {
                                ch = text[i];
                            }
                        }
                        ret += ch;
                        first = (ch == '\n');
                    }
                    return ret;
                },
                decode: function(text) {
                    var ret = "",
                        ch, newRet = '';
                    for (var i in text) {
                        ch = this.mapInverse[text[i]];
                        ret += ((typeof(ch) == "undefined") ? text[i] : ch);
                    }
                    for (var i in ret) {
                        ch = ret[i].charCodeAt(0);
                        if (ch != 160 && ch != 8239 && ch != 8413) {
                            newRet += ret[i];
                        }
                    }
                    return newRet;
                },
                map: {},
                mapInverse: {}
            },
            squares: {
                init: function() {},
                encode: function(text) {
                    var ret = "",
                        ch, first = true;
                    for (var i in text) {
                        if (text[i].charCodeAt(0) >= 33) {
                            ch = text[i] + String.fromCharCode(8414);
                            if (!first) {
                                ch = String.fromCharCode(8239) + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(8239) + ch;
                            }
                        } else {
                            ch = text[i];
                        }
                        ret += ch;
                        first = (ch == '\n');
                    }
                    return ret;
                },
                decode: function(text) {
                    var ret = "",
                        ch;
                    for (var i in text) {
                        ch = text[i].charCodeAt(0);
                        if (ch != 160 && ch != 8239 && ch != 8414) {
                            ret += text[i];
                        }
                    }
                    return ret;
                }
            },
            roundsquares: {
                init: function() {},
                encode: function(text) {
                    var ret = "",
                        ch, first = true;
                    for (var i in text) {
                        if (text[i].charCodeAt(0) >= 33) {
                            ch = text[i] + String.fromCharCode(8419);
                            if (!first) {
                                ch = String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(160) + ch;
                            }
                        } else {
                            ch = text[i];
                        }
                        ret += ch;
                        first = (ch == '\n');
                    }
                    return ret;
                },
                decode: function(text) {
                    var ret = "",
                        ch;
                    for (var i in text) {
                        ch = text[i].charCodeAt(0);
                        if (ch != 160 && ch != 8239 && ch != 8419) {
                            ret += text[i];
                        }
                    }
                    return ret;
                }
            },
            bent: {
                init: function() {
                    for (var i in this.map) {
                        this.map[this.map[i]] = i;
                    }
                },
                encode: function(text) {
                    var ret = '',
                        ch;
                    for (var i = 0, len = text.length; i < len; i++) {
                        ch = this.map[text.charAt(i)];
                        if (typeof(ch) == "undefined") {
                            ch = text.charAt(i);
                        }
                        ret += ch;
                    }
                    return ret;
                },
                decode: function(text) {
                    var ret = '',
                        ch;
                    for (var i = 0, len = text.length; i < len; i++) {
                        ch = this.map[text.charAt(i)];
                        if (typeof(ch) == "undefined") {
                            ch = text.charAt(i);
                        }
                        ret += ch;
                    }
                    return ret;
                },
                map: {
                    'a': 'Ä…',
                    'b': 'Ò',
                    'c': 'Ã§',
                    'd': 'Õª',
                    'e': 'Ò½',
                    'f': 'Æ’',
                    'g': 'Ö',
                    'h': 'Õ°',
                    'i': 'Ã¬',
                    'j': 'Ê',
                    'k': 'ÒŸ',
                    'l': 'Ó€',
                    'm': 'Ê',
                    'n': 'Õ²',
                    'o': 'Ö…',
                    'p': 'Ö„',
                    'q': 'Õ¦',
                    'r': 'É¾',
                    's': 'Ê‚',
                    't': 'Õ§',
                    'u': 'Õ´',
                    'v': 'Ñµ',
                    'w': 'Õ¡',
                    'x': 'Ã—',
                    'y': 'Õ¾',
                    'z': 'Õ€',
                    'A': 'Èº',
                    'B': 'Î²',
                    'C': 'â†»',
                    'D': 'áŽ ',
                    'E': 'Æ',
                    'F': 'Æ‘',
                    'G': 'Æ“',
                    'H': 'Ç¶',
                    'I': 'Ä¯',
                    'J': 'Ù„',
                    'K': 'Ò ',
                    'L': 'êˆ',
                    'M': 'â±®',
                    'N': 'áž ',
                    'O': 'à¶§',
                    'P': 'Ï†',
                    'Q': 'Ò¨',
                    'R': 'à½ ',
                    'S': 'Ïš',
                    'T': 'Í²',
                    'U': 'Ô±',
                    'V': 'á»¼',
                    'W': 'à°š',
                    'X': 'áƒ¯',
                    'Y': 'Ó‹',
                    'Z': 'É€',
                    '0': 'âŠ˜',
                    '1': 'ï¿½ï¿½',
                    '2': 'Ï©',
                    '3': 'Ó ',
                    '4': 'à¥«',
                    '5': 'Æ¼',
                    '6': 'Ï¬',
                    '7': '7',
                    '8': 'ï¿½ï¿½',
                    '9': 'à¥¯',
                    '&': 'â…‹',
                    '(': '{',
                    ')': '}',
                    '{': '(',
                    '}': ')',
                    'Ã¤': 'Ä…' + '\u0308',
                    'Ã¶': 'Ö…' + '\u0308',
                    'Ã¼': 'Õ´' + '\u0308',
                    'Ã„': 'Èº' + '\u0308',
                    'Ã–': 'à¶§' + '\u0308',
                    'Ãœ': 'Ô±' + '\u0308',
                    'Ã©': 'Ò½' + '\u0301',
                    'Ã¡': 'Ä…' + '\u0301',
                    'Ã³': 'Ö…' + '\u0301',
                    'Ãº': 'Õ´' + '\u0301',
                    'Ã‰': 'Æ' + '\u0301',
                    'Ã': 'Èº' + '\u0301',
                    'Ã“': 'à¶§' + '\u0301',
                    'Ãš': 'Ô±' + '\u0301',
                    'Ã¨': 'Ò½' + '\u0300',
                    'Ã ': 'Ä…' + '\u0300',
                    'Ã²': 'Ö…' + '\u0300',
                    'Ã¹': 'Õ´' + '\u0300',
                    'Ãˆ': 'Æ' + '\u0300',
                    'Ã€': 'Èº' + '\u0300',
                    'Ã’': 'à¶§' + '\u0300',
                    'Ã™': 'Ô±' + '\u0300',
                    'Ãª': 'Ò½' + '\u0302',
                    'Ã¢': 'Ä…' + '\u0302',
                    'Ã´': 'Ö…' + '\u0302',
                    'Ã»': 'Õ´' + '\u0302',
                    'ÃŠ': 'Æ' + '\u0302',
                    'Ã‚': 'Èº' + '\u0302',
                    'Ã”': 'à¶§' + '\u0302',
                    'Ã›': 'Ô±' + '\u0302'
                }
            },
            tiny: {
                init: function() {
                    for (var i in this.map) {
                        this.map[this.map[i]] = i;
                    }
                },
                encode: function(text) {
                    var ret = '',
                        ch;
                    text = text.toUpperCase();
                    for (var i = 0, len = text.length; i < len; i++) {
                        ch = this.map[text.charAt(i)];
                        if (typeof(ch) == "undefined") {
                            ch = text.charAt(i);
                        }
                        ret += ch;
                    }
                    return ret;
                },
                decode: function(text) {
                    var ret = '',
                        ch;
                    for (var i = 0, len = text.length; i < len; i++) {
                        ch = this.map[text.charAt(i)];
                        if (typeof(ch) == "undefined") {
                            ch = text.charAt(i);
                        }
                        ret += ch;
                    }
                    return ret;
                },
                map: {
                    'A': 'á´€',
                    'B': 'Ê™',
                    'C': 'á´„',
                    'D': 'á´…',
                    'E': 'á´‡',
                    'F': 'êœ°',
                    'G': 'É¢',
                    'H': 'Êœ',
                    'I': 'Éª',
                    'J': 'á´Š',
                    'K': 'á´‹',
                    'L': 'ÊŸ',
                    'M': 'á´',
                    'N': 'É´',
                    'O': 'á´',
                    'P': 'á´˜',
                    'Q': 'Q',
                    'R': 'Ê€',
                    'S': 'êœ±',
                    'T': 'á´›',
                    'U': 'á´œ',
                    'V': 'á´ ',
                    'W': 'á´¡',
                    'X': 'x',
                    'Y': 'Ê',
                    'Z': 'á´¢'
                }
            }
        };
        for (var i in this.tools) {
            this.tools[i].init();
        }
        this.getHTML = function(text) {
            var html = '',
                ch, lastSpaceWasNonBreaking = true,
                highSurrogate = 0,
                codepoint = 0;
            for (var i = 0, len = text.length; i < len; i++) {
                ch = text.charCodeAt(i);
                if (ch == 10 || ch == 13) {
                    html += '<br>\n';
                    lastSpaceWasNonBreaking = true;
                } else if (ch == 32) {
                    if (lastSpaceWasNonBreaking) {
                        html += ' ';
                        lastSpaceWasNonBreaking = false;
                    } else {
                        html += '&nbsp;';
                        lastSpaceWasNonBreaking = true;
                    }
                } else {
                    if (ch >= 0xD800 && ch <= 0xDBFF) {
                        highSurrogate = ch;
                        codepoint = 0;
                    } else if (highSurrogate > 0) {
                        if (ch >= 0xDC00 && ch <= 0xDFFF) {
                            codepoint = (highSurrogate - 0xD800) * 1024 + (ch - 0xDC00) + 0x10000;
                        }
                        highSurrogate = 0;
                    } else {
                        codepoint = ch;
                    }
                    if (codepoint != 0) {
                        html += '&#x' + codepoint.toString(16) + ';';
                        lastSpaceWasNonBreaking = true;
                    }
                }
            }
            return html;
        }
    }
}
const luni = new Lunicode();

function ranNumb(min, max = null) {
    if (max !== null) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return Math.floor(Math.random() * min) + 1
    }
}

function padLead(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function niceBytes(x) {
    let units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0,
        n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
        n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

function runtime(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

function runtimes(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + "d " : "";
    var hDisplay = h < 10 ? "0" + h + ":" : h > 0 ? h + ":" : "";
    var mDisplay = m < 10 ? "0" + m + ":" : m > 0 ? m + ":" : "";
    var sDisplay = s < 10 ? "0" + s : s > 0 ? s : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

async function cerpen(category) {
    return new Promise(async (resolve, reject) => {
        let title = category.toLowerCase().replace(/[()*]/g, "")
        let length, judul = title.replace(/\s/g, "-")
        try {
            let res = await axios.get('http://cerpenmu.com/category/cerpen-' + judul)
            let $ = await cheerio.load(res.data)
            length = $('html body div#wrap div#content article.post div.wp-pagenavi a')
            length = length['4'].attribs.href.split('/').pop()
        } catch {
            length = 0
        }
        let page = Math.floor(Math.random() * parseInt(length))
        axios.get('http://cerpenmu.com/category/cerpen-' + judul + '/page/' + page)
            .then((get) => {
                let $ = cheerio.load(get.data)
                let link = []
                $('article.post').each(function(a, b) {
                    link.push($(b).find('a').attr('href'))
                })
                let random = link[Math.floor(Math.random() * link.length)]
                axios.get(random)
                    .then((res) => {
                        let $$ = cheerio.load(res.data)
                        let hasil = {
                            title: $$('#content > article > h1').text(),
                            author: $$('#content > article').text().split('Cerpen Karangan: ')[1].split('Kategori: ')[0],
                            kategori: $$('#content > article').text().split('Kategori: ')[1].split('\n')[0],
                            lolos: $$('#content > article').text().split('Lolos moderasi pada: ')[1].split('\n')[0],
                            cerita: $$('#content > article > p').text()
                        }
                        resolve(hasil)
                    })
            })
    })
}

function quotesAnime() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 185)
        axios.get('https://otakotaku.com/quote/feed/' + page)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = []
                $('div.kotodama-list').each(function(l, h) {
                    hasil.push({
                        link: $(h).find('a').attr('href'),
                        gambar: $(h).find('img').attr('data-src'),
                        karakter: $(h).find('div.char-name').text().trim(),
                        anime: $(h).find('div.anime-title').text().trim(),
                        episode: $(h).find('div.meta').text(),
                        up_at: $(h).find('small.meta').text(),
                        quotes: $(h).find('div.quote').text().trim()
                    })
                })
                resolve(hasil)
            }).catch(reject)
    })
}

async function getBuffer(url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}

function lirik(judul) {
    return new Promise(async (resolve, reject) => {
        axios.get('https://www.musixmatch.com/search/' + judul)
            .then(async ({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = {};
                let limk = 'https://www.musixmatch.com'
                const link = limk + $('div.media-card-body > div > h2').find('a').attr('href')
                await axios.get(link)
                    .then(({
                        data
                    }) => {
                        const $$ = cheerio.load(data)
                        hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
                        $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function(a, b) {
                            hasil.lirik = $$(b).find('span > p > span').text() + '\n' + $$(b).find('span > div > p > span').text()
                        })
                    })
                resolve(hasil)
            })
            .catch(reject)
    })
}

function wallpaper(query) {
    return new Promise((resolve, reject) => {
        axios.get('https://www.wallpaperflare.com/search?wallpaper=' + query, {
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "cookie": "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ"
                }
            })
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const result = [];
                $('#gallery > li > figure > a').each(function(a, b) {
                    result.push($(b).find('img').attr('data-src'))
                })
                resolve(result)
            })
            .catch({
                status: 'err'
            })
    })
}

function playstore(name) {
    return new Promise((resolve, reject) => {
        axios.get('https://play.google.com/store/search?q=' + name + '&c=apps')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                let ln = [];
                let nm = [];
                let dv = [];
                let lm = [];
                const result = [];
                $('div.wXUyZd > a').each(function(a, b) {
                    const link = 'https://play.google.com' + $(b).attr('href')
                    ln.push(link);
                })
                $('div.b8cIId.ReQCgd.Q9MA7b > a > div').each(function(d, e) {
                    const name = $(e).text().trim()
                    nm.push(name);
                })
                $('div.b8cIId.ReQCgd.KoLSrc > a > div').each(function(f, g) {
                    const dev = $(g).text().trim();
                    dv.push(dev)
                })
                $('div.b8cIId.ReQCgd.KoLSrc > a').each(function(h, i) {
                    const limk = 'https://play.google.com' + $(i).attr('href');
                    lm.push(limk);
                })
                for (let i = 0; i < ln.length; i++) {
                    result.push({
                        name: nm[i],
                        link: ln[i],
                        developer: dv[i],
                        link_dev: lm[i]
                    })
                }
                resolve(result)
            })
            .catch(reject)
    })
}

function linkwa(nama) {
    return new Promise((resolve, reject) => {
        axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=' + nama + '&searchby=name')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data);
                const result = [];
                const lnk = [];
                const nm = [];
                $('div.wa-chat-title-container').each(function(a, b) {
                    const limk = $(b).find('a').attr('href');
                    lnk.push(limk)
                })
                $('div.wa-chat-title-text').each(function(c, d) {
                    const name = $(d).text();
                    nm.push(name)
                })
                for (let i = 0; i < lnk.length; i++) {
                    result.push({
                        nama: nm[i].split('. ')[1],
                        link: lnk[i].split('?')[0]
                    })
                }
                resolve(result)
            })
            .catch(reject)
    })
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

function generate(n) {
    var add = 1,
        max = 12 - add
    if (n > max) return generate(max) + generate(n - max)
    max = Math.pow(10, n + add)
    var min = max / 10
    var number = Math.floor(Math.random() * (max - min + 1)) + min
    return ('' + number).substring(add)
}

const delay = time => new Promise(res => setTimeout(res, time))

const isUrl = (text) => {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

const readMore = String.fromCharCode(8206).repeat(4001)

const someincludes = (data, id) => {
    let res = data.find(el => id.includes(el))
    return res ? true : false;
}

const somematch = (data, id) => {
    let res = data.find(el => el === id)
    return res ? true : false;
}

async function GDriveDl(url) {
    let id, res = {
        "error": true
    }
    if (!(url && url.match(/drive\.google/i))) return res
    try {
        id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
        if (!id) throw 'ID Not Found'
        res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
            method: 'post',
            headers: {
                'accept-encoding': 'gzip, deflate, br',
                'content-length': 0,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'origin': 'https://drive.google.com',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
                'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
                'x-drive-first-party': 'DriveWebUi',
                'x-json-requested': 'true'
            }
        })
        let {
            fileName,
            sizeBytes,
            downloadUrl
        } = JSON.parse((await res.text()).slice(4))
        if (!downloadUrl) throw 'Link Download Limit!'
        let data = await fetch(downloadUrl)
        if (data.status !== 200) return data.statusText
        return {
            downloadUrl,
            fileName,
            fileSize: formatSize(sizeBytes),
            mimetype: data.headers.get('content-type')
        }
    } catch (e) {
        console.log(e)
        return res
    }
}

async function FancyText(text, page) {
    try {
        const response = await fetch('https://www.thefancytext.com/api/font', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page,
                text,
                size: 1
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data.results[0].text;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

var alpha_default = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var keys = alpha_default.split('');
var tinytext = {
    "a": "ᵃ",
    "b": "ᵇ",
    "c": "ᶜ",
    "d": "ᵈ",
    "e": "ᵉ",
    "f": "ᶠ",
    "g": "ᵍ",
    "h": "ʰ",
    "i": "ⁱ",
    "j": "ʲ",
    "k": "ᵏ",
    "l": "ˡ",
    "m": "ᵐ",
    "n": "ⁿ",
    "o": "ᵒ",
    "p": "ᵖ",
    "q": "ᑫ",
    "r": "ʳ",
    "s": "ˢ",
    "t": "ᵗ",
    "u": "ᵘ",
    "v": "ᵛ",
    "w": "ʷ",
    "x": "ˣ",
    "y": "ʸ",
    "z": "ᶻ",
    "A": "ᵃ",
    "B": "ᵇ",
    "C": "ᶜ",
    "D": "ᵈ",
    "E": "ᵉ",
    "F": "ᶠ",
    "G": "ᵍ",
    "H": "ʰ",
    "I": "ⁱ",
    "J": "ʲ",
    "K": "ᵏ",
    "L": "ˡ",
    "M": "ᵐ",
    "N": "ⁿ",
    "O": "ᵒ",
    "P": "ᵖ",
    "Q": "ᵠ",
    "R": "ʳ",
    "S": "ˢ",
    "T": "ᵗ",
    "U": "ᵘ",
    "V": "ᵛ",
    "X": "ˣ",
    "W": "ʷ",
    "Y": "ʸ",
    "Z": "ᶻ",
    "`": "`",
    "~": "~",
    "!": "﹗",
    "@": "@",
    "#": "#",
    "$": "﹩",
    "%": "﹪",
    "^": "^",
    "&": "﹠",
    "*": "﹡",
    "(": "⁽",
    ")": "⁾",
    "_": "⁻",
    "-": "⁻",
    "=": "⁼",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": "﹕",
    ";": "﹔",
    "?": "﹖",
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
};
var smallcapstext = {
    "a": "ᴀ",
    "b": "ʙ",
    "c": "ᴄ",
    "d": "ᴅ",
    "e": "ᴇ",
    "f": "ꜰ",
    "g": "ɢ",
    "h": "ʜ",
    "i": "ɪ",
    "j": "ᴊ",
    "k": "ᴋ",
    "l": "ʟ",
    "m": "ᴍ",
    "n": "ɴ",
    "o": "ᴏ",
    "p": "ᴘ",
    "q": "q",
    "r": "ʀ",
    "s": "s",
    "t": "ᴛ",
    "u": "ᴜ",
    "v": "ᴠ",
    "w": "ᴡ",
    "x": "x",
    "y": "ʏ",
    "z": "ᴢ",
    "A": "A",
    "B": "B",
    "C": "C",
    "D": "D",
    "E": "E",
    "F": "F",
    "G": "G",
    "H": "H",
    "I": "I",
    "J": "J",
    "K": "K",
    "L": "L",
    "M": "M",
    "N": "N",
    "O": "O",
    "P": "P",
    "Q": "Q",
    "R": "R",
    "S": "S",
    "T": "T",
    "U": "U",
    "V": "V",
    "W": "W",
    "X": "X",
    "Y": "Y",
    "Z": "Z",
    "`": "`",
    "~": "~",
    "!": "﹗",
    "@": "@",
    "#": "#",
    "$": "﹩",
    "%": "﹪",
    "^": "^",
    "&": "﹠",
    "*": "﹡",
    "(": "⁽",
    ")": "⁾",
    "_": "⁻",
    "-": "⁻",
    "=": "⁼",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": "﹕",
    ";": "﹔",
    "?": "﹖",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
};
var boldtext = {
    "a": "𝐚",
    "b": "𝐛",
    "c": "𝐜",
    "d": "𝐝",
    "e": "𝐞",
    "f": "𝐟",
    "g": "𝐠",
    "h": "𝐡",
    "i": "𝐢",
    "j": "𝐣",
    "k": "𝐤",
    "l": "𝐥",
    "m": "𝐦",
    "n": "𝐧",
    "o": "𝐨",
    "p": "𝐩",
    "q": "𝐪",
    "r": "𝐫",
    "s": "𝐬",
    "t": "𝐭",
    "u": "𝐮",
    "v": "𝐯",
    "w": "𝐰",
    "x": "𝐱",
    "y": "𝐲",
    "z": "𝐳",
    "A": "𝐀",
    "B": "𝐁",
    "C": "𝐂",
    "D": "𝐃",
    "E": "𝐄",
    "F": "𝐅",
    "G": "𝐆",
    "H": "𝐇",
    "I": "𝐈",
    "J": "𝐉",
    "K": "𝐊",
    "L": "𝐋",
    "M": "𝐌",
    "N": "𝐍",
    "O": "𝐎",
    "P": "𝐏",
    "Q": "𝐐",
    "R": "𝐑",
    "S": "𝐒",
    "T": "𝐓",
    "U": "𝐔",
    "V": "𝐕",
    "X": "𝐗",
    "W": "𝐖",
    "Y": "𝐘",
    "Z": "𝐙",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "𝟎",
    "1": "𝟏",
    "2": "𝟐",
    "3": "𝟑",
    "4": "𝟒",
    "5": "𝟓",
    "6": "𝟔",
    "7": "𝟕",
    "8": "𝟖",
    "9": "𝟗",
};
var circledtext = {
    "a": "ⓐ",
    "b": "ⓑ",
    "c": "ⓒ",
    "d": "ⓓ",
    "e": "ⓔ",
    "f": "ⓕ",
    "g": "ⓖ",
    "h": "ⓗ",
    "i": "ⓘ",
    "j": "ⓙ",
    "k": "ⓚ",
    "l": "ⓛ",
    "m": "ⓜ",
    "n": "ⓝ",
    "o": "ⓞ",
    "p": "ⓟ",
    "q": "ⓠ",
    "r": "ⓡ",
    "s": "ⓢ",
    "t": "ⓣ",
    "u": "ⓤ",
    "v": "ⓥ",
    "w": "ⓦ",
    "x": "ⓧ",
    "y": "ⓨ",
    "z": "ⓩ",
    "A": "Ⓐ",
    "B": "Ⓑ",
    "C": "Ⓒ",
    "D": "Ⓓ",
    "E": "Ⓔ",
    "F": "Ⓕ",
    "G": "Ⓖ",
    "H": "Ⓗ",
    "I": "Ⓘ",
    "J": "Ⓙ",
    "K": "Ⓚ",
    "L": "Ⓛ",
    "M": "Ⓜ",
    "N": "Ⓝ",
    "O": "Ⓞ",
    "P": "Ⓟ",
    "Q": "Ⓠ",
    "R": "Ⓡ",
    "S": "Ⓢ",
    "T": "Ⓣ",
    "U": "Ⓤ",
    "V": "Ⓥ",
    "X": "Ⓧ",
    "W": "Ⓦ",
    "Y": "Ⓨ",
    "Z": "Ⓩ",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "⊛",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "0",
    "1": "①",
    "2": "②",
    "3": "③",
    "4": "④",
    "5": "⑤",
    "6": "⑥",
    "7": "⑦",
    "8": "⑧",
    "9": "⑨",
};
var invertedcircledtext = {
    "a": "🅐",
    "b": "🅑",
    "c": "🅒",
    "d": "🅓",
    "e": "🅔",
    "f": "🅕",
    "g": "🅖",
    "h": "🅗",
    "i": "🅘",
    "j": "🅙",
    "k": "🅚",
    "l": "🅛",
    "m": "🅜",
    "n": "🅝",
    "o": "🅞",
    "p": "🅟",
    "q": "🅠",
    "r": "🅡",
    "s": "🅢",
    "t": "🅣",
    "u": "🅤",
    "v": "🅥",
    "w": "🅦",
    "x": "🅧",
    "y": "🅨",
    "z": "🅩",
    "A": "🅐",
    "B": "🅑",
    "C": "🅒",
    "D": "🅓",
    "E": "🅔",
    "F": "🅕",
    "G": "🅖",
    "H": "🅗",
    "I": "🅘",
    "J": "🅙",
    "K": "🅚",
    "L": "🅛",
    "M": "🅜",
    "N": "🅝",
    "O": "🅞",
    "P": "🅟",
    "Q": "🅠",
    "R": "🅡",
    "S": "🅢",
    "T": "🅣",
    "U": "🅤",
    "V": "🅥",
    "W": "🅦",
    "X": "🅧",
    "Y": "🅨",
    "Z": "🅩",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "⊛",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "⓿",
    "1": "➊",
    "2": "➋",
    "3": "➌",
    "4": "➍",
    "5": "➎",
    "6": "➏",
    "7": "➐",
    "8": "➑",
    "9": "➒"
};
var vaporwavetext = {
    "a": "ａ",
    "b": "ｂ",
    "c": "ｃ",
    "d": "ｄ",
    "e": "ｅ",
    "f": "ｆ",
    "g": "ｇ",
    "h": "ｈ",
    "i": "ｉ",
    "j": "ｊ",
    "k": "ｋ",
    "l": "ｌ",
    "m": "ｍ",
    "n": "ｎ",
    "o": "ｏ",
    "p": "ｐ",
    "q": "ｑ",
    "r": "ｒ",
    "s": "ｓ",
    "t": "ｔ",
    "u": "ｕ",
    "v": "ｖ",
    "w": "ｗ",
    "x": "ｘ",
    "y": "ｙ",
    "z": "ｚ",
    "A": "Ａ",
    "B": "Ｂ",
    "C": "Ｃ",
    "D": "Ｄ",
    "E": "Ｅ",
    "F": "Ｆ",
    "G": "Ｇ",
    "H": "Ｈ",
    "I": "Ｉ",
    "J": "Ｊ",
    "K": "Ｋ",
    "L": "Ｌ",
    "M": "Ｍ",
    "N": "Ｎ",
    "O": "Ｏ",
    "P": "Ｐ",
    "Q": "Ｑ",
    "R": "Ｒ",
    "S": "Ｓ",
    "T": "Ｔ",
    "U": "Ｕ",
    "V": "Ｖ",
    "X": "Ｘ",
    "W": "Ｗ",
    "Y": "Ｙ",
    "Z": "Ｚ",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "⊛",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "０",
    "1": "１",
    "2": "２",
    "3": "３",
    "4": "４",
    "5": "５",
    "6": "６",
    "7": "７",
    "8": "８",
    "9": "９"
};
var emojitext = {
    "a": "🅰",
    "b": "🅱",
    "c": "🌜",
    "d": "🌛",
    "e": "🎗",
    "f": "🎏",
    "g": "🌀",
    "h": "♓",
    "i": "🎐",
    "j": "🎷",
    "k": "🎋",
    "l": "👢",
    "m": "〽️",
    "n": "🎵",
    "o": "⚽",
    "p": "🅿️",
    "q": "🍳",
    "r": "🌱",
    "s": "💲",
    "t": "🌴",
    "u": "⛎",
    "v": "✅",
    "w": "🔱",
    "x": "❎",
    "y": "🍸",
    "z": "💤",
    "A": "🅰",
    "B": "🅱",
    "C": "🌜",
    "D": "🌛",
    "E": "🎗",
    "F": "🎏",
    "G": "🌀",
    "H": "♓",
    "I": "🎐",
    "J": "🎷",
    "K": "🎋",
    "L": "👢",
    "M": "〽️",
    "N": "🎵",
    "O": "⚽",
    "P": "🅿️",
    "Q": "🍳",
    "R": "🌱",
    "S": "💲",
    "T": "🌴",
    "U": "⛎",
    "V": "✅",
    "W": "🔱",
    "X": "❎",
    "Y": "🍸",
    "Z": "💤",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "⊛",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9"
};
var squaretext = {
    "a": "🄰",
    "b": "🄱",
    "c": "🄲",
    "d": "🄳",
    "e": "🄴",
    "f": "🄵",
    "g": "🄶",
    "h": "🄷",
    "i": "🄸",
    "j": "🄹",
    "k": "🄺",
    "l": "🄻",
    "m": "🄼",
    "n": "🄽",
    "o": "🄾",
    "p": "🄿",
    "q": "🅀",
    "r": "🅁",
    "s": "🅂",
    "t": "🅃",
    "u": "🅄",
    "v": "🅅",
    "w": "🅆",
    "x": "🅇",
    "y": "🅈",
    "z": "🅉",
    "A": "🄰",
    "B": "🄱",
    "C": "🄲",
    "D": "🄳",
    "E": "🄴",
    "F": "🄵",
    "G": "🄶",
    "H": "🄷",
    "I": "🄸",
    "J": "🄹",
    "K": "🄺",
    "L": "🄻",
    "M": "🄼",
    "N": "🄽",
    "O": "🄾",
    "P": "🄿",
    "Q": "🅀",
    "R": "🅁",
    "S": "🅂",
    "T": "🅃",
    "U": "🅄",
    "V": "🅅",
    "W": "🅆",
    "X": "🅇",
    "Y": "🅈",
    "Z": "🅉",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "⊛",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9"
};
var blacksquaretext = {
    "a": "🅰",
    "b": "🅱",
    "c": "🅲",
    "d": "🅳",
    "e": "🅴",
    "f": "🅵",
    "g": "🅶",
    "h": "🅷",
    "i": "🅸",
    "j": "🅹",
    "k": "🅺",
    "l": "🅻",
    "m": "🅼",
    "n": "🅽",
    "o": "🅾",
    "p": "🅿",
    "q": "🆀",
    "r": "🆁",
    "s": "🆂",
    "t": "🆃",
    "u": "🆄",
    "v": "🆅",
    "w": "🆆",
    "x": "🆇",
    "y": "🆈",
    "z": "🆉",
    "A": "🅰",
    "B": "🅱",
    "C": "🅲",
    "D": "🅳",
    "E": "🅴",
    "F": "🅵",
    "G": "🅶",
    "H": "🅷",
    "I": "🅸",
    "J": "🅹",
    "K": "🅺",
    "L": "🅻",
    "M": "🅼",
    "N": "🅽",
    "O": "🅾",
    "P": "🅿",
    "Q": "🆀",
    "R": "🆁",
    "S": "🆂",
    "T": "🆃",
    "U": "🆄",
    "V": "🆅",
    "W": "🆆",
    "X": "🆇",
    "Y": "🆈",
    "Z": "🆉",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "⊛",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "⊖",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9"
};
var invertedtext = {
    "a": "ɐ",
    "b": "q",
    "c": "ɔ",
    "d": "p",
    "e": "ǝ",
    "f": "ɟ",
    "g": "ƃ",
    "h": "ɥ",
    "i": "ı",
    "j": "ɾ",
    "k": "ʞ",
    "l": "ן",
    "m": "ɯ",
    "n": "u",
    "o": "o",
    "p": "d",
    "q": "b",
    "r": "ɹ",
    "s": "s",
    "t": "ʇ",
    "u": "n",
    "v": "ʌ",
    "w": "ʍ",
    "x": "x",
    "y": "ʎ",
    "z": "z",
    "A": "ɐ",
    "B": "q",
    "C": "ɔ",
    "D": "p",
    "E": "ǝ",
    "F": "ɟ",
    "G": "ƃ",
    "H": "ɥ",
    "I": "ı",
    "J": "ɾ",
    "K": "ʞ",
    "L": "ן",
    "M": "ɯ",
    "N": "u",
    "O": "o",
    "P": "d",
    "Q": "b",
    "R": "ɹ",
    "S": "s",
    "T": "ʇ",
    "U": "n",
    "V": "𐌡",
    "X": "x",
    "W": "ʍ",
    "Y": "ʎ",
    "Z": "z",
    "`": "`",
    "~": "~",
    "!": "¡",
    "@": "@",
    "#": "#",
    "$": "﹩",
    "%": "﹪",
    "^": "^",
    "&": "⅋",
    "*": "*",
    "(": ")",
    ")": "(",
    "_": "⁻",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "}",
    "[": "]",
    "}": "{",
    "]": "[",
    ":": ":",
    ";": ";",
    "?": "¿",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
};
var backwardstext = {
    "a": "ɒ",
    "b": "d",
    "c": "ↄ",
    "d": "b",
    "e": "ɘ",
    "f": "ʇ",
    "g": "g",
    "h": "⑁",
    "i": "i",
    "j": "j",
    "k": "k",
    "l": "l",
    "m": "m",
    "n": "ᴎ",
    "o": "o",
    "p": "q",
    "q": "p",
    "r": "ᴙ",
    "s": "ƨ",
    "t": "ɟ",
    "u": "U",
    "v": "v",
    "w": "w",
    "x": "x",
    "y": "γ",
    "z": "z",
    "A": "A",
    "B": "d",
    "C": "Ↄ",
    "D": "b",
    "E": "Ǝ",
    "F": "ꟻ",
    "G": "G",
    "H": "H",
    "I": "I",
    "J": "J",
    "K": "K",
    "L": "⅃",
    "M": "M",
    "N": "ᴎ",
    "O": "O",
    "P": "ꟼ",
    "Q": "p",
    "R": "ᴙ",
    "S": "Ꙅ",
    "T": "T",
    "U": "U",
    "V": "V",
    "X": "X",
    "W": "W",
    "Y": "Y",
    "Z": "Z",
    "`": "`",
    "~": "~",
    "!": "﹗",
    "@": "@",
    "#": "#",
    "$": "﹩",
    "%": "﹪",
    "^": "^",
    "&": "&",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "⁻",
    "-": "⁻",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": "﹕",
    ";": "﹔",
    "?": "﹖",
    "0": "0",
    "1": "߁",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
};
var boldcursivetext = {
    "a": "𝓪",
    "b": "𝓫",
    "c": "𝓬",
    "d": "𝓭",
    "e": "𝓮",
    "f": "𝓯",
    "g": "𝓰",
    "h": "𝓱",
    "i": "𝓲",
    "j": "𝓳",
    "k": "𝓴",
    "l": "𝓵",
    "m": "𝓶",
    "n": "𝓷",
    "o": "𝓸",
    "p": "𝓹",
    "q": "𝓺",
    "r": "𝓻",
    "s": "𝓼",
    "t": "𝓽",
    "u": "𝓾",
    "v": "𝓿",
    "w": "𝔀",
    "x": "𝔁",
    "y": "𝔂",
    "z": "𝔃",
    "A": "𝓐",
    "B": "𝓑",
    "C": "𝓒",
    "D": "𝓓",
    "E": "𝓔",
    "F": "𝓕",
    "G": "𝓖",
    "H": "𝓗",
    "I": "𝓘",
    "J": "𝓙",
    "K": "𝓚",
    "L": "𝓛",
    "M": "𝓜",
    "N": "𝓝",
    "O": "𝓞",
    "P": "𝓟",
    "Q": "𝓠",
    "R": "𝓡",
    "S": "𝓢",
    "T": "𝓣",
    "U": "𝓤",
    "V": "𝓥",
    "W": "𝓦",
    "X": "𝓧",
    "Y": "𝓨",
    "Z": "𝓩",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
};
var cursivetext = {
    "a": "𝒶",
    "b": "𝒷",
    "c": "𝒸",
    "d": "𝒹",
    "e": "ℯ",
    "f": "𝒻",
    "g": "ℊ",
    "h": "𝒽",
    "i": "𝒾",
    "j": "𝒿",
    "k": "𝓀",
    "l": "𝓁",
    "m": "𝓂",
    "n": "𝓃",
    "o": "ℴ",
    "p": "𝓅",
    "q": "𝓆",
    "r": "𝓇",
    "s": "𝓈",
    "t": "𝓉",
    "u": "𝓊",
    "v": "𝓋",
    "w": "𝓌",
    "x": "𝓍",
    "y": "𝓎",
    "z": "𝓏",
    "A": "𝒜",
    "B": "ℬ",
    "C": "𝒞",
    "D": "𝒟",
    "E": "ℰ",
    "F": "ℱ",
    "G": "𝒢",
    "H": "ℋ",
    "I": "ℐ",
    "J": "𝒥",
    "K": "𝒦",
    "L": "ℒ",
    "M": "ℳ",
    "N": "𝒩",
    "O": "𝒪",
    "P": "𝒫",
    "Q": "𝒬",
    "R": "ℛ",
    "S": "𝒮",
    "T": "𝒯",
    "U": "𝒰",
    "V": "𝒱",
    "W": "𝒲",
    "X": "𝒳",
    "Y": "𝒴",
    "Z": "𝒵",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
};
var italicstext = {
    "a": "𝘢",
    "b": "𝘣",
    "c": "𝘤",
    "d": "𝘥",
    "e": "𝘦",
    "f": "𝘧",
    "g": "𝘨",
    "h": "𝘩",
    "i": "𝘪",
    "j": "𝘫",
    "k": "𝘬",
    "l": "𝘭",
    "m": "𝘮",
    "n": "𝘯",
    "o": "𝘰",
    "p": "𝘱",
    "q": "𝘲",
    "r": "𝘳",
    "s": "𝘴",
    "t": "𝘵",
    "u": "𝘶",
    "v": "𝘷",
    "w": "𝘸",
    "x": "𝘹",
    "y": "𝘺",
    "z": "𝘻",
    "A": "𝘈",
    "B": "𝘉",
    "C": "𝘊",
    "D": "𝘋",
    "E": "𝘌",
    "F": "𝘍",
    "G": "𝘎",
    "H": "𝘏",
    "I": "𝘐",
    "J": "𝘑",
    "K": "𝘒",
    "L": "𝘓",
    "M": "𝘔",
    "N": "𝘕",
    "O": "𝘖",
    "P": "𝘗",
    "Q": "𝘘",
    "R": "𝘙",
    "S": "𝘚",
    "T": "𝘛",
    "U": "𝘜",
    "V": "𝘝",
    "W": "𝘞",
    "X": "𝘟",
    "Y": "𝘠",
    "Z": "𝘡",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "*",
    "&": "&",
    "*": "^",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
};
var strikethroughtext = {
    "a": "a̶",
    "b": "b̶",
    "c": "c̶",
    "d": "d̶",
    "e": "e̶",
    "f": "f̶",
    "g": "g̶",
    "h": "h̶",
    "i": "i̶",
    "j": "j̶",
    "k": "k̶",
    "l": "l̶",
    "m": "m̶",
    "n": "n̶",
    "o": "o̶",
    "p": "p̶",
    "q": "q̶",
    "r": "r̶",
    "s": "s̶",
    "t": "t̶",
    "u": "u̶",
    "v": "v̶",
    "w": "w̶",
    "x": "x̶",
    "y": "y̶",
    "z": "z̶",
    "A": "A̶",
    "B": "B̶",
    "C": "C̶",
    "D": "D̶",
    "E": "E̶",
    "F": "F̶",
    "G": "G̶",
    "H": "H̶",
    "I": "I̶",
    "J": "J̶",
    "K": "K̶",
    "L": "L̶",
    "M": "M̶",
    "N": "N̶",
    "O": "O̶",
    "P": "P̶",
    "Q": "Q̶",
    "R": "R̶",
    "S": "S̶",
    "T": "T̶",
    "U": "U̶",
    "V": "V̶",
    "X": "X̶",
    "W": "W̶",
    "Y": "Y̶",
    "Z": "Z̶",
    "`": "`̶",
    "~": "~̶",
    "!": "!̶",
    "@": "@̶",
    "#": "#̶",
    "$": "$̶",
    "%": "%̶",
    "^": "^̶",
    "&": "&̶",
    "*": "*̶",
    "(": "(̶",
    ")": ")̶",
    "_": "_̶",
    "-": "-̶",
    "=": "=̶",
    "+": "+̶",
    "{": "{̶",
    "[": "[̶",
    "}": "}̶",
    "]": "]̶",
    ":": ":̶",
    ";": ";̶",
    "?": "?̶",
    "0": "0̶",
    "1": "1̶",
    "2": "2̶",
    "3": "3̶",
    "4": "4̶",
    "5": "5̶",
    "6": "6̶",
    "7": "7̶",
    "8": "8̶",
    "9": "9̶",
};
var underlinetext = {
    "a": "a͟",
    "b": "b͟",
    "c": "c͟",
    "d": "d͟",
    "e": "e͟",
    "f": "f͟",
    "g": "g͟",
    "h": "h͟",
    "i": "i͟",
    "j": "j͟",
    "k": "k͟",
    "l": "l͟",
    "m": "m͟",
    "n": "n͟",
    "o": "o͟",
    "p": "p͟",
    "q": "q͟",
    "r": "r͟",
    "s": "s͟",
    "t": "t͟",
    "u": "u͟",
    "v": "v͟",
    "w": "w͟",
    "x": "x͟",
    "y": "y͟",
    "z": "z͟",
    "A": "A͟",
    "B": "B͟",
    "C": "C͟",
    "D": "D͟",
    "E": "E͟",
    "F": "F͟",
    "G": "G͟",
    "H": "H͟",
    "I": "I͟",
    "J": "J͟",
    "K": "K͟",
    "L": "L͟",
    "M": "M͟",
    "N": "N͟",
    "O": "O͟",
    "P": "P͟",
    "Q": "Q͟",
    "R": "R͟",
    "S": "S͟",
    "T": "T͟",
    "U": "U͟",
    "V": "V͟",
    "W": "W͟",
    "X": "X͟",
    "Y": "Y͟",
    "Z": "Z͟",
    "`": "`͟",
    "~": "~͟",
    "!": "!͟",
    "@": "@͟",
    "#": "#͟",
    "$": "$͟",
    "%": "%͟",
    "^": "^͟",
    "&": "&͟",
    "*": "*͟",
    "(": "(͟",
    ")": ")͟",
    "_": "_͟",
    "-": "-͟",
    "=": "=͟",
    "+": "+͟",
    "{": "{͟",
    "[": "[͟",
    "}": "}͟",
    "]": "]͟",
    ":": ":͟",
    ";": ";͟",
    "?": "?͟",
    "0": "0͟",
    "1": "1͟",
    "2": "2͟",
    "3": "3͟",
    "4": "4͟",
    "5": "5͟",
    "6": "6͟",
    "7": "7͟",
    "8": "8͟",
    "9": "9͟",
};
var doubleunderlinetext = {
    "a": "a͇",
    "b": "b͇",
    "c": "c͇",
    "d": "d͇",
    "e": "e͇",
    "f": "f͇",
    "g": "g͇",
    "h": "h͇",
    "i": "i͇",
    "j": "j͇",
    "k": "k͇",
    "l": "l͇",
    "m": "m͇",
    "n": "n͇",
    "o": "o͇",
    "p": "p͇",
    "q": "q͇",
    "r": "r͇",
    "s": "s͇",
    "t": "t͇",
    "u": "u͇",
    "v": "v͇",
    "w": "w͇",
    "x": "x͇",
    "y": "y͇",
    "z": "z͇",
    "A": "A͇",
    "B": "B͇",
    "C": "C͇",
    "D": "D͇",
    "E": "E͇",
    "F": "F͇",
    "G": "G͇",
    "H": "H͇",
    "I": "I͇",
    "J": "J͇",
    "K": "K͇",
    "L": "L͇",
    "M": "M͇",
    "N": "N͇",
    "O": "O͇",
    "P": "P͇",
    "Q": "Q͇",
    "R": "R͇",
    "S": "S͇",
    "T": "T͇",
    "U": "U͇",
    "V": "V͇",
    "W": "W͇",
    "X": "X͇",
    "Y": "Y͇",
    "Z": "Z͇",
    "`": "`͇",
    "~": "~͇",
    "!": "!͇",
    "@": "@͇",
    "#": "#͇",
    "$": "$͇",
    "%": "%͇",
    "^": "^͇",
    "&": "&͇",
    "*": "*͇",
    "(": "(͇",
    ")": ")͇",
    "_": "_͇",
    "-": "-͇",
    "=": "=͇",
    "+": "+͇",
    "{": "{͇",
    "[": "[͇",
    "}": "}͇",
    "]": "]͇",
    ":": ":͇",
    ";": ";͇",
    "?": "?͇",
    "0": "0͇",
    "1": "1͇",
    "2": "2͇",
    "3": "3͇",
    "4": "4͇",
    "5": "5͇",
    "6": "6͇",
    "7": "7͇",
    "8": "8͇",
    "9": "9͇",
};
var bolditalic_serif = {
    "a": "𝒂",
    "b": "𝒃",
    "c": "𝒄",
    "d": "𝒅",
    "e": "𝒆",
    "f": "𝒇",
    "g": "𝒈",
    "h": "𝒉",
    "i": "𝒊",
    "j": "𝒋",
    "k": "𝒌",
    "l": "𝒍",
    "m": "𝒎",
    "n": "𝒏",
    "o": "𝒐",
    "p": "𝒑",
    "q": "𝒒",
    "r": "𝒓",
    "s": "𝒔",
    "t": "𝒕",
    "u": "𝒖",
    "v": "𝒗",
    "w": "𝒘",
    "x": "𝒙",
    "y": "𝒚",
    "z": "𝒛",
    "A": "𝑨",
    "B": "𝑩",
    "C": "𝑪",
    "D": "𝑫",
    "E": "𝑬",
    "F": "𝑭",
    "G": "𝑮",
    "H": "𝑯",
    "I": "𝑰",
    "J": "𝑱",
    "K": "𝑲",
    "L": "𝑳",
    "M": "𝑴",
    "N": "𝑵",
    "O": "𝑶",
    "P": "𝑷",
    "Q": "𝑸",
    "R": "𝑹",
    "S": "𝑺",
    "T": "𝑻",
    "U": "𝑼",
    "V": "𝑽",
    "W": "𝑾",
    "X": "𝑿",
    "Y": "𝒀",
    "Z": "𝒁",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "*",
    "&": "&",
    "*": "^",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9"
};
var bolditalic_sans_serif = {
    "a": "𝙖",
    "b": "𝙗",
    "c": "𝙘",
    "d": "𝙙",
    "e": "𝙚",
    "f": "𝙛",
    "g": "𝙜",
    "h": "𝙝",
    "i": "𝙞",
    "j": "𝙟",
    "k": "𝙠",
    "l": "𝙡",
    "m": "𝙢",
    "n": "𝙣",
    "o": "𝙤",
    "p": "𝙥",
    "q": "𝙦",
    "r": "𝙧",
    "s": "𝙨",
    "t": "𝙩",
    "u": "𝙪",
    "v": "𝙫",
    "w": "𝙬",
    "x": "𝙭",
    "y": "𝙮",
    "z": "𝙯",
    "A": "𝘼",
    "B": "𝘽",
    "C": "𝘾",
    "D": "𝘿",
    "E": "𝙀",
    "F": "𝙁",
    "G": "𝙂",
    "H": "𝙃",
    "I": "𝙄",
    "J": "𝙅",
    "K": "𝙆",
    "L": "𝙇",
    "M": "𝙈",
    "N": "𝙉",
    "O": "𝙊",
    "P": "𝙋",
    "Q": "𝙌",
    "R": "𝙍",
    "S": "𝙎",
    "T": "𝙏",
    "U": "𝙐",
    "V": "𝙑",
    "W": "𝙒",
    "X": "𝙓",
    "Y": "𝙔",
    "Z": "𝙕",
    "`": "`",
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "*",
    "&": "&",
    "*": "^",
    "(": "(",
    ")": ")",
    "_": "_",
    "-": "-",
    "=": "=",
    "+": "+",
    "{": "{",
    "[": "[",
    "}": "}",
    "]": "]",
    ":": ":",
    ";": ";",
    "?": "?",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9"
};
var cursed_text = {
    chars: {
        0: ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'],
        1: ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'],
        2: ['\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334', '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362', '\u0338', '\u0337', '\u0361', '\u0489']
    },
    random: function(len) {
        if (len == 1) return 0;
        return !!len ? Math.floor(Math.random() * len + 1) - 1 : Math.random();
    },
    generate: function(str) {
        var str_arr = str.split(''),
            output = str_arr.map(function(a) {
                if (a == " ") return a;
                for (var i = 0, l = cursed_text.random(16); i < l; i++) {
                    var rand = cursed_text.random(3);
                    a += cursed_text.chars[rand][cursed_text.random(cursed_text.chars[rand].length)];
                }
                return a;
            });
        return output.join('');
    }
};

function Flip(text) {
    var effectName = 'flip';
    var encodedText = luni.tools[effectName].encode(text);
    return encodedText;
}

function Mirror(text) {
    var effectName = 'mirror';
    var encodedText = luni.tools[effectName].encode(text);
    return encodedText;
}

function Creepify(text, maxHeight) {
    var effectName = 'creepify';
    var encodedText = luni.tools[effectName].encode(text);
    luni.tools.creepify.options.maxHeight = maxHeight || 8;
    return encodedText;
}

function Bubbles(text) {
    var effectName = 'bubbles';
    var encodedText = luni.tools[effectName].encode(text);
    return encodedText;
}

function Squares(text) {
    var effectName = 'squares';
    var encodedText = luni.tools[effectName].encode(text);
    return encodedText;
}

function Roundsquares(text) {
    var effectName = 'roundsquares';
    var encodedText = luni.tools[effectName].encode(text);
    return encodedText;
}

function Bent(text) {
    var effectName = 'bent';
    var encodedText = luni.tools[effectName].encode(text);
    return encodedText;
}

function BlackCircled(text) {
    return text.split('').map(function(a) {
        return invertedcircledtext.hasOwnProperty(a) ? invertedcircledtext[a] : a;
    }).join('');
}

function Gothic(text) {
    var values = '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ0123456789';
    return convert_text(text, keys, values);
}

function BoldGothic(text) {
    var values = '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅0123456789';
    return convert_text(text, keys, values);
}

function DoubleStruck(text) {
    var values = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡';
    return convert_text(text, keys, values);
}

function Mono(text) {
    var values = '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿';
    return convert_text(text, keys, values);
}

function Squiggle1(text) {
    var values = 'αճcժҽբցհíյklตղօթզɾsԵմѵաxվzαճcժҽբցհíյklตղօթզɾsԵմѵաxվz0123456789';
    return convert_text(text, keys, values);
}

function Squiggle2(text) {
    var values = 'ԹՅՇԺeԲԳɧɿʝkʅʍՌԾρφՐՏԵՄעաՃՎՀԹՅՇԺeԲԳɧɿʝkʅʍՌԾρφՐՏԵՄעաՃՎՀ0123456789';
    return convert_text(text, keys, values);
}

function Crazy1(text) {
    var values = 'ꍏ♭☾◗€Ϝ❡♄♗♪ϰ↳♔♫⊙ρ☭☈ⓢ☂☋✓ω⌘☿☡ꍏ♭☾◗€Ϝ❡♄♗♪ϰ↳♔♫⊙ρ☭☈ⓢ☂☋✓ω⌘☿☡0123456789';
    return convert_text(text, keys, values);
}

function Crazy2(text) {
    var values = '♬ᖲ¢ᖱ៩⨏❡Ϧɨɉƙɭ៣⩎០ᖰᖳƦនƬ⩏⩔Ɯ✗ƴȤ♬ᖲ¢ᖱ៩⨏❡Ϧɨɉƙɭ៣⩎០ᖰᖳƦនƬ⩏⩔Ɯ✗ƴȤ0123456789';
    return convert_text(text, keys, values);
}

function Ancient(text) {
    var values = 'ልጌርዕቿቻኗዘጎጋጕረጠክዐየዒዪነፕሁሀሠሸሃጊልጌርዕቿቻኗዘጎጋጕረጠክዐየዒዪነፕሁሀሠሸሃጊ0123456789';
    return convert_text(text, keys, values);
}

function Fireworks(text) {
    var values = 'a҉b҉c҉d҉e҉f҉g҉h҉i҉j҉k҉l҉m҉n҉o҉p҉q҉r҉s҉t҉u҉v҉w҉x҉y҉z҉A҉B҉C҉D҉E҉F҉G҉H҉I҉J҉K҉L҉M҉N҉O҉P҉Q҉R҉S҉T҉U҉V҉W҉X҉Y҉Z҉0҉1҉2҉3҉4҉5҉6҉7҉8҉9҉';
    return convert_text(text, keys, values);
}

function Stinky(text) {
    var values = 'a̾b̾c̾d̾e̾f̾g̾h̾i̾j̾k̾l̾m̾n̾o̾p̾q̾r̾s̾t̾u̾v̾w̾x̾y̾z̾A̾B̾C̾D̾E̾F̾G̾H̾I̾J̾K̾L̾M̾N̾O̾P̾Q̾R̾S̾T̾U̾V̾W̾X̾Y̾Z̾0̾1̾2̾3̾4̾5̾6̾7̾8̾9̾';
    return convert_text(text, keys, values);
}

function Seagull(text) {
    var values = 'a̼b̼c̼d̼e̼f̼g̼h̼i̼j̼k̼l̼m̼n̼o̼p̼q̼r̼s̼t̼u̼v̼w̼x̼y̼z̼A̼B̼C̼D̼E̼F̼G̼H̼I̼J̼K̼L̼M̼N̼O̼P̼Q̼R̼S̼T̼U̼V̼W̼X̼Y̼Z̼0̼1̼2̼3̼4̼5̼6̼7̼8̼9̼';
    return convert_text(text, keys, values);
}

function Musical(text) {
    var values = '♬ᖲ¢ᖱ៩⨏❡Ϧɨɉƙɭ៣⩎០ᖰᖳƦនƬ⩏⩔Ɯ✗ƴȤ♬ᖲ¢ᖱ៩⨏❡Ϧɨɉƙɭ៣⩎០ᖰᖳƦនƬ⩏⩔Ɯ✗ƴȤ0123456789';
    return convert_text(text, keys, values);
}

function Frame(text) {
    var values = 'a̺͆b̺͆c̺͆d̺͆e̺͆f̺͆g̺͆h̺͆i̺͆j̺͆k̺͆l̺͆m̺͆n̺͆o̺͆p̺͆q̺͆r̺͆s̺͆t̺͆u̺͆v̺͆w̺͆x̺͆y̺͆z̺͆A̺͆B̺͆C̺͆D̺͆E̺͆F̺͆G̺͆H̺͆I̺͆J̺͆K̺͆L̺͆M̺͆N̺͆O̺͆P̺͆Q̺͆R̺͆S̺͆T̺͆U̺͆V̺͆W̺͆X̺͆Y̺͆Z̺͆0̺͆1̺͆2̺͆3̺͆4̺͆5̺͆6̺͆7̺͆8̺͆9̺͆';
    return convert_text(text, keys, values);
}

function Bracket(text) {
    var values = '『a』『b』『c』『d』『e』『f』『g』『h』『i』『j』『k』『l』『m』『n』『o』『p』『q』『r』『s』『t』『u』『v』『w』『x』『y』『z』『A』『B』『C』『D』『E』『F』『G』『H』『I』『J』『K』『L』『M』『N』『O』『P』『Q』『R』『S』『T』『U』『V』『W』『X』『Y』『Z』『0』『1』『2』『3』『4』『5』『6』『7』『8』『9』';
    return convert_text(text, keys, values);
}

function DarkBracket(text) {
    var values = '【a】【b】【c】【d】【e】【f】【g】【h】【i】【j】【k】【l】【m】【n】【o】【p】【q】【r】【s】【t】【u】【v】【w】【x】【y】【z】【A】【B】【C】【D】【E】【F】【G】【H】【I】【J】【K】【L】【M】【N】【O】【P】【Q】【R】【S】【T】【U】【V】【W】【X】【Y】【Z】【0】【1】【2】【3】【4】【5】【6】【7】【8】【9】';
    return convert_text(text, keys, values);
}

function Asian(text) {
    var values = '卂乃匚ᗪ乇千Ꮆ卄丨ﾌҜㄥ爪几ㄖ卩Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙卂乃匚ᗪ乇千Ꮆ卄丨ﾌҜㄥ爪几ㄖ卩Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙0123456789';
    return convert_text(text, keys, values);
}

function Tribal(text) {
    var values = 'ꍏꌃꉓꀸꍟꎇꁅꃅꀤꀭꀘ꒒ꂵꈤꂦꉣꆰꋪꌗ꓄ꀎꃴꅏꊼꌩꁴꍏꌃꉓꀸꍟꎇꁅꃅꀤꀭꀘ꒒ꂵꈤꂦꉣꆰꋪꌗ꓄ꀎꃴꅏꊼꌩꁴ0123456789';
    return convert_text(text, keys, values);
}

function convert_text(text, keys, values) {
    values = [...values];
    if (values.length == 186) {
        var merged = keys.reduce((obj, key, index) => ({
            ...obj,
            [key]: (values[index * 3] + values[index * 3 + 1] + values[index * 3 + 2])
        }), {});
    } else if (values.length == 124) {
        var merged = keys.reduce((obj, key, index) => ({
            ...obj,
            [key]: (values[index * 2] + values[index * 2 + 1])
        }), {});
    } else {
        var merged = keys.reduce((obj, key, index) => ({
            ...obj,
            [key]: values[index]
        }), {});
    }
    return text.split('').map(function(a) {
        return merged.hasOwnProperty(a) ? merged[a] : a;
    }).join('');
}

function BoldItalicsSans(text) {
    return text.split('').map(function(a) {
        return bolditalic_sans_serif.hasOwnProperty(a) ? bolditalic_sans_serif[a] : a;
    }).join('');
}

function BoldItalicsSerif(text) {
    return text.split('').map(function(a) {
        return bolditalic_serif.hasOwnProperty(a) ? bolditalic_serif[a] : a;
    }).join('');
}

function Emoji(text) {
    return text.split('').map(function(a) {
        return emojitext.hasOwnProperty(a) ? emojitext[a] : a;
    }).join('');
}

function Vaporwave(text) {
    return text.split('').map(function(a) {
        return vaporwavetext.hasOwnProperty(a) ? vaporwavetext[a] : a;
    }).join('');
}

function Square(text) {
    return text.split('').map(function(a) {
        return squaretext.hasOwnProperty(a) ? squaretext[a] : a;
    }).join('');
}

function BlackSquare(text) {
    return text.split('').map(function(a) {
        return blacksquaretext.hasOwnProperty(a) ? blacksquaretext[a] : a;
    }).join('');
}

function Strikethrough(text) {
    return text.split('').map(function(a) {
        return strikethroughtext.hasOwnProperty(a) ? strikethroughtext[a] : a;
    }).join('');
}

function Underline(text) {
    return text.split('').map(function(a) {
        return underlinetext.hasOwnProperty(a) ? underlinetext[a] : a;
    }).join('');
}

function DoubleUnderline(text) {
    return text.split('').map(function(a) {
        return doubleunderlinetext.hasOwnProperty(a) ? doubleunderlinetext[a] : a;
    }).join('');
}

function BoldCursive(text) {
    return text.split('').map(function(a) {
        return boldcursivetext.hasOwnProperty(a) ? boldcursivetext[a] : a;
    }).join('');
}

function Cursive(text) {
    return text.split('').map(function(a) {
        return cursivetext.hasOwnProperty(a) ? cursivetext[a] : a;
    }).join('');
}

function Italics(text) {
    return text.split('').map(function(a) {
        return italicstext.hasOwnProperty(a) ? italicstext[a] : a;
    }).join('');
}

function SmallCaps(text) {
    return text.split('').map(function(a) {
        return smallcapstext.hasOwnProperty(a) ? smallcapstext[a] : a;
    }).join('');
}

function TinyText(text) {
    return text.split('').map(function(a) {
        return tinytext.hasOwnProperty(a) ? tinytext[a] : a;
    }).join('');
}

function Bold(text) {
    return text.split('').map(function(a) {
        return boldtext.hasOwnProperty(a) ? boldtext[a] : a;
    }).join('');
}

function Circled(text) {
    return text.split('').map(function(a) {
        return circledtext.hasOwnProperty(a) ? circledtext[a] : a;
    }).join('');
}

function Backwards(text) {
    return reverseString(text.split('').map(function(a) {
        return backwardstext.hasOwnProperty(a) ? backwardstext[a] : a;
    }).join(''));
}

function Inverted(text) {
    return reverseString(text.split('').map(function(a) {
        return invertedtext.hasOwnProperty(a) ? invertedtext[a] : a;
    }).join(''));
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function snake_case(title) {
    title = title.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
    });
    title = title.replace(/[\s]/g, "_");
    title = title.replace(/[^\w]/gi, '');
    console.log("snake case");
    return title.charAt(0).toLowerCase() + title.substr(1);
}

function UpperCamel(title) {
    title = title.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    title = title.replace(/[^A-Za-z]/gi, '')
    title = title.replace(" ", "");
    return title;
}

function lowerCamel(title) {
    title = UpperCamel(title);
    return title.charAt(0).toLowerCase() + title.substr(1);
}

function lower(word) {
    return word.toLowerCase();
}

function upper(word) {
    var pad_front = word.search(/\S|$/);
    return word.substring(0, pad_front) + word.substr(pad_front, 1).toUpperCase() + word.substring(pad_front + 1).toLowerCase();
}

function SentenceCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export {
    Ancient,
    Asian,
    Backwards,
    Bent,
    BlackCircled,
    BlackSquare,
    Bold,
    BoldCursive,
    BoldGothic,
    BoldItalicsSans,
    BoldItalicsSerif,
    Bracket,
    Bubbles,
    Circled,
    Crazy1,
    Crazy2,
    Creepify,
    Cursive,
    DarkBracket,
    DoubleStruck,
    DoubleUnderline,
    Emoji,
    FancyText,
    Fireworks,
    Flip,
    Frame,
    GDriveDl,
    Gothic,
    Inverted,
    Italics,
    Mirror,
    Mono,
    Musical,
    Roundsquares,
    Seagull,
    SentenceCase,
    SmallCaps,
    Square,
    Squares,
    Squiggle1,
    Squiggle2,
    Stinky,
    Strikethrough,
    TinyText,
    Tribal,
    Underline,
    UpperCamel,
    Vaporwave,
    capitalizeFirstLetter,
    cerpen,
    convert_text,
    delay,
    generate,
    getBuffer,
    getRandom,
    isNumber,
    isUrl,
    linkwa,
    lirik,
    lower,
    lowerCamel,
    niceBytes,
    padLead,
    pickRandom,
    playstore,
    quotesAnime,
    ranNumb,
    readMore,
    reverseString,
    runtime,
    runtimes,
    snake_case,
    someincludes,
    somematch,
    upper,
    wallpaper
}