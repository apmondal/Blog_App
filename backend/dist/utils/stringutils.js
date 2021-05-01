"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
function slugify(title) {
    let slugarr = [];
    var n = title.length;
    if (n > 11)
        n = 11;
    for (let i = 0; i < title.length; i++) {
        if (i >= 30)
            break;
        let char = title[i];
        if (char >= 'A' && char <= 'Z')
            char = title[i].toLowerCase();
        if (char != ' ')
            slugarr.push(char);
        else
            slugarr.push('-');
    }
    if (slugarr[slugarr.length - 1] != '-')
        slugarr.push('-');
    for (let i = 0; i < 4; i++) {
        var char = Math.floor(Math.random() * 26);
        slugarr.push(String.fromCharCode('a'.charCodeAt(0) + char));
        char = Math.floor(Math.random() * 26);
        slugarr.push(String.fromCharCode('A'.charCodeAt(0) + char));
    }
    n = (30 - slugarr.length);
    for (let i = 0; i < n; i++) {
        slugarr.push(Math.floor(Math.random() * 10));
    }
    return slugarr.join("");
}
exports.slugify = slugify;
