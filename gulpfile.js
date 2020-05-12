'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    tingpng = require('gulp-tinypng'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    pug = require('gulp-pug'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css-with-types'),
    fontName = 'iconfont';

gulp.task('serve', function(){
  browserSync.init({
    server: {
	 baseDir: './build'
    }
  });
});

gulp.task('pug', function(){
  return gulp.src('src/pug/pages/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: 'Pug',
          message: err.message
        }
      })
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'))
    .on('end', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src('src/static/scss/style.scss')
    .pipe(sourcemaps.init())// инициируем сорсмап
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: 'Styles',
          message: err.message
        }
      })
    }))
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))// автопрефиксер
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('vendors', function(){
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/wowjs/dist/wow.js'
  ])
    .pipe(concat('vendors.min.js'))
    .pipe(gulp.dest('build/js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('scripts', function(){
  return gulp.src([		
    'src/static/js/init.js',
    'src/static/js/main.js'
  ])
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('build/js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('imgOptimiz', function(){
  return gulp.src('src/static/img/pic/**/*')
    .pipe(tingpng('hwgYyJfq6xpD48zZDrzwQ4tnrTK2JDKj'))
    .pipe(gulp.dest('build/img/pic/'))
});

gulp.task('pic', function() {
  return gulp.src('src/static/img/pic/**/*')      
    .pipe(gulp.dest('build/img/pic/'))
    .pipe(browserSync.reload({
      stream: true
  }));
});
gulp.task('favicon', function() {
  return gulp.src('src/static/img/favicon/*')      
    .pipe(gulp.dest('build/img/favicon/'))
    .pipe(browserSync.reload({
      stream: true
  }));
});
gulp.task('og', function() {
  return gulp.src('src/static/img/og/*')      
    .pipe(gulp.dest('build/img/og/'))
    .pipe(browserSync.reload({
      stream: true
  }));
});
gulp.task('svg', function() {
  return gulp.src('src/static/img/svg/*')      
    .pipe(gulp.dest('build/img/svg/'))
    .pipe(browserSync.reload({
      stream: true
  }));
});

gulp.task('fonts', function() {
  return gulp.src('src/static/fonts/*')      
    .pipe(gulp.dest('build/fonts/'))
    .pipe(browserSync.reload({
      stream: true
  }));
});

gulp.task('iconfont', function(){
  return gulp.src(['src/static/img/iconfont/*.svg'])
    .pipe(iconfontCss({
      path: 'src/static/scss/_icons_template.scss',
      fontName: fontName,
      targetPath: '../scss/_icons.scss',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName
    }))
    .pipe(gulp.dest('src/static/fonts/'))
    .pipe(browserSync.reload({
      stream: true
    }));
}, ['fonts', 'sass']);

gulp.task('watch', function() {
  gulp.watch('src/pug/**/*', gulp.series('pug'));
  gulp.watch('src/static/scss/**/*', gulp.series('sass'));
  gulp.watch('src/static/js/*.js', gulp.series('scripts'));
  gulp.watch('src/static/img/pic/*', gulp.series('pic'));
  gulp.watch('src/static/img/favicon/*', gulp.series('favicon'));
  gulp.watch('src/static/img/og/*', gulp.series('og'));
  gulp.watch('src/static/img/svg/*', gulp.series('svg'));
  gulp.watch('src/static/fonts/*', gulp.series('fonts'));
  gulp.watch('src/static/img/svg/*.svg', gulp.series('svg'));
});

gulp.task('default', gulp.series(
  gulp.parallel('iconfont'),
  gulp.parallel('pug', 'sass', 'vendors', 'scripts', 'pic', 'favicon', 'og', 'svg', 'fonts'),
  gulp.parallel('watch', 'serve')
));