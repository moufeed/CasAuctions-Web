module.exports =  {
    getBundles: function(regexPattern , files ) {
        return files.filter(function (bundle) {
            return regexPattern.test(bundle.outputFileName);
        });
    },
    regex : {
        css: /\.css$/,
        html: /\.(html|htm)$/,
        js: /\.js$/,
        po: /\.po$/
    }
}