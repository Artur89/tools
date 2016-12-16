var ncp = require("copy-paste");

var escChars = ['.', '^', '$', '?', '!', '|', '[', ']', '(', ')', '{', '}'];

(function() {
    var i = 0,
        bool = true,
        re,
        text;

    text = ncp.copy(ncp.paste(), function() {
        var escape = function(sym) {
            re = new RegExp('\\' + sym, 'g');
            text = text.replace(re, function(match) {
                return '\\' + match;
            });
        }

        do {
            escape(escChars[i]);
            i++;
            bool = i !== escChars.length;
        } while(bool);

        ncp.copy(text, function() {
            console.log(text);
            process.exit();
        });

    });

}());
