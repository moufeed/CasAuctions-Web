const 
gulp = require('gulp'),
header = require('gulp-header'),
watch = require('gulp-watch'),
sass = require('gulp-sass')
concat = require('gulp-concat'),
rename = require('gulp-rename'),
autoprefixer = require('gulp-autoprefixer'),
uglify =  require('gulp-uglify-es').default, 
merge = require("merge-stream"),
babel = require('gulp-babel'),
admin_conf = require('../config/admin'),
pkg = require('../../../package.json'),
mod = require('../lib/module')
;


gulp.task('a:css',  ()=> {
    console.log(admin_conf.css.dist)
    return gulp.src(admin_conf.css.src)
        .pipe(sass(admin_conf.sassOptions).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(admin_conf.header, {
            pkg: pkg
        }))
        .pipe(autoprefixer(admin_conf.css.prefixerOptions))
        .pipe(gulp.dest(admin_conf.css.dist));
});
// ----------------------------------------------------
// -- admin javscript files
// ----------------------------------------------------
gulp.task("a:js",  ()=> {

 

    var tasks = mod.getBundles(mod.regex.js , admin_conf.js.files).map( (file)=> {


        
        let g =  gulp.src(file.inputFiles, { base: "." })
                .pipe(concat(file.outputFileName));
                if(file.es6){
                   
                    g.pipe(babel({
                        presets: [['env', { 
                                modules: false ,
                                "targets": {
                                    "browsers": [ ">0.25%"]
                                  }
                            }]],
                    }))
                } 
              
                
                g.pipe(uglify({
                    mangle: false
                })) 

                 g.pipe(rename({
                    suffix: '.min'
                }))
                .pipe(header(admin_conf.header, {
                    pkg: pkg
                }))
                .pipe(gulp.dest(admin_conf.js.dist));

        return g;
    });
    return merge(tasks);


}); 

// ----------------------------------------------------
// -- admin  watch files
// ----------------------------------------------------
gulp.task('a:w',  ()=> {
    gulp.watch(admin_conf.js.watch, ['a:js']);
    gulp.watch(admin_conf.css.src, ['a:css']);
});
