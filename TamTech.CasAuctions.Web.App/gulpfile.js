const gulp = require('gulp');

require('require-dir',{ extensions: ['.js'] })('./src/gulp/tasks');

 

// portal 
gulp.task('p', ['p:css', 'p:js','p:f'  ]); 

// admin 
gulp.task('a', ['a:css', 'a:js' ]); 

//shop
gulp.task('s', ['s:css', 's:js'  ,'s:f']); 

//
gulp.task('default', ['p' ,'a' ,'s' ]); 