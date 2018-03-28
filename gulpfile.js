const gulp = require('gulp');
const less = require('gulp-less');


gulp.task('less',function(){
    return gulp.src(['./src/less/*.less','!_*.less']).pipe(less()).pipe(gulp.dest('./public/css'))
})