const gulp = require("gulp"),
      merge = require("merge-stream"),
      concat = require("gulp-concat"),
      header = require('gulp-header'),
      local_conf = require("../config/localization"),
      pkg = require('../../../package.json'),
      mod = require('../lib/module');
      
 
 

 
    
 

gulp.task('po', function() {
 
    let tasks = mod.getBundles(mod.regex.po , local_conf.files).map( (file)=> {
        
        return gulp.src(file.inputFiles, { base: "." })
                .pipe(concat(file.outputFileName))
                .pipe(header(local_conf.header, {
                    pkg: pkg
                }))
                .pipe(gulp.dest(local_conf.dist));

    })

    return merge(tasks);
  });