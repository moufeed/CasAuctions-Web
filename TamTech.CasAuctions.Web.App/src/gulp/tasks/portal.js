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
conf = require('../config/portal'),
pkg = require('../../../package.json'),
mod = require('../lib/module')
;
 


//-------------------------------------------------
// --  portal style files 
//-------------------------------------------------

gulp.task('p:css', ()=> {
    
    return gulp.src(conf.css.src)
        .pipe(sass(conf.sassOptions).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(conf.header, {
            pkg: pkg
        }))
        .pipe(autoprefixer(conf.css.prefixerOptions))
        .pipe(gulp.dest(conf.css.dist));
});



// ----------------------------------------------------
// -- portal javscript files
// ----------------------------------------------------

gulp.task("p:js",  ()=> {
    let tasks = mod.getBundles(mod.regex.js , conf.js.files).map( (file)=> {
        let  g = gulp.src(file.inputFiles, { base: "." })
                .pipe(concat(file.outputFileName));
                if(file.es6){
                    g.pipe(babel({
                        presets: [['env', { modules: false }]],
                    }))
                } 
                g.pipe(uglify({
                    mangle: true
                }))
                .pipe(rename({
                    suffix: '.min'
                }))
                .pipe(header(conf.header, {
                    pkg: pkg
                }))
                .pipe(gulp.dest(conf.js.dist));
            return g;
    });
    return merge(tasks);
});



// ----------------------------------------------------
// -- portal fonts files
// ----------------------------------------------------

gulp.task('p:f', function() {

    let tasks = conf.fonts.map((folder)=>{
       return gulp.src(folder.input)
       .pipe(gulp.dest(folder.output))
    })
    
    return merge(tasks)
 })


// ----------------------------------------------------
// -- portal  watch files
// ----------------------------------------------------

gulp.task('p:w',  ()=> {
    gulp.watch(conf.js.watch, ['p:js']);
    gulp.watch(conf.css.src, ['p:css']);
});
