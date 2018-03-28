const gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var gutil = require('gulp-util');
// var colors = require('colors');  
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var LessAutoprefix = require('less-plugin-autoprefix');
var cleancss = require('gulp-clean-css');
var del = require('delete');
var autoprefix = new LessAutoprefix({
  browsers: ['last 2 versions']
});
//删除中间处理文件
gulp.task('del',['cssuglify'],function(){
    del(['./src/css/*'], function(err, deleted) {
        if (err) throw err;
        console.log("delete success");
      });
})
//js处理

gulp.task('js',function(){
    return gulp.src('./src/js/*.js')
    .pipe(uglify({
        //
    })).on('error',errorhandling)
    .pipe(gulp.dest('./public/js'))
})
//css压缩
gulp.task('cssuglify',['less'],function(){
    return gulp.src('./src/css/*.css')
    .pipe(cleancss({

    })).on('error',errorhandling)
    .pipe(gulp.dest('./public/css'))
})
//处理less
gulp.task('less', function () {
  return gulp.src(['./src/less/*.less','!./src/less/_*.less'])
    .pipe(sourcemaps.init())
    .pipe(less({
        plugins:[autoprefix]
    })).on('error', errorhandling)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', ['del'], function () {
  return gulp.watch('./src/less/*', ['del']);
})


gulp.task('default',['watch']);




function errorhandling(err) {
  gutil.log(gutil.colors.red(err.message))
  this.end();
}