
var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var header = require('gulp-header');
var tap = require('gulp-tap');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var pkg = require('./package.json');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var pump = require('pump');
var yargs = require('yargs')
    .options({
        'w': {
            alias: 'watch',
            type: 'boolean'
        },
        's': {
            alias: 'server',
            type: 'boolean'
        },
        'p': {
            alias: 'port',
            type: 'number'
        },
        't': {
            alias: 'project',
            type: 'string'
        }
    }).argv;

var option = {base: 'src'};
var dist = '/Users/weixiumei/html/demo';
var org = 'src';

gulp.task('compress', function (cb) {
  pump([
        gulp.src('/assets/js/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('build:style', function (){
    var banner = [
        '/*!',
        ' * WeUI v<%= pkg.version %> (<%= pkg.homepage %>)',
        ' * Copyright <%= new Date().getFullYear() %> Tencent, Inc.',
        ' * Licensed under the <%= pkg.license %> license',
        ' */',
        ''].join('\n');
    gulp.src(org + '/assets/css/style.less', option)
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function (e) {
            console.error(e.message);
            this.emit('end');
        }))
        .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1'])]))
        // .pipe(header(banner, { pkg : pkg } ))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}))
        .pipe(nano({
            zindex: false,
            autoprefixer: false
        }))
        .pipe(rename(function (path) {
            path.basename += '';
        }))
        .pipe(gulp.dest(dist));
});


gulp.task('build:html:combine', function (){
    gulp.src(org + '/*.html', option)
        .pipe(tap(function (file){
            var dir = path.dirname(file.path)+'/tpl/';
            var contents = file.contents.toString();

            //gutil.log(file.path);

            contents = contents.replace(/<#include\s'(.*)'>/gi, function (match, $1){
                var filename = path.join(dir, $1);
                var id = path.basename(filename, '.html');
                var content = fs.readFileSync(filename, 'utf-8');
                //gutil.log("here is content:"+content);
                return content;
            });
            file.contents = new Buffer(contents);
        }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:assets/js', function (){
    console.log('hallo');
    gulp.src(org + '/assets/**/*.?(svg|png|jpg|gif|js|json)', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
    gulp.src(org + '/assets/js/*.js', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('build:vendor/js', function (){
    gulp.src(org + '/assets/vendor/**/*.?(svg|png|jpg|gif|js)', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('build:upload', function (){
    gulp.src(org + '/upload/*.?(svg|png|jpg|gif|jpeg)', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('build:assets/css', function (){
    gulp.src(org + '/assets/**/*.?(css)', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

// gulp.task('build:html', function (){
//     gulp.src(org + '/*.html', option)
//         .pipe(gulp.dest(dist))
//         .pipe(browserSync.reload({stream: true}));
// });

gulp.task('build:html', ['build:html:combine']);
gulp.task('build:example', ['build:assets/js','build:vendor/js','build:assets/css', 'build:html','build:upload']);

gulp.task('release', ['build:style','build:example']);

gulp.task('watch', ['release'], function () {
    // gulp.watch(org + '/assets/js/*.*', ['build:assets/js']);
    // gulp.watch(org + '/assets/css/*.*', ['build:assets/css']);
    gulp.watch(org + '/**/*.*', ['build:style','build:example']);
});

gulp.task('server', function () {
    yargs.p = yargs.p || 8080;
    browserSync.init({
        server: {
            baseDir: dist
        },
        ui: {
            port: yargs.p + 1,
            weinre: {
                port: yargs.p + 2
            }
        },
        port: yargs.p,
        startPath: '/'
    });
});

// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', ['release'], function () {

    switch(yargs.project){
        // gulp -t demo -w -s
        case 'demo': 
             dist ='nt-demo'; 
             org = 'src-demo'; 
             option.base = org; 
        break;
        case 'project-name': 
             dist ='nt-project-name'; 
             org = 'src-project-name'; 
             option.base = org; 
        break;
        default:
            dist = 'nt-' + yargs.project;
            org = 'src-' + yargs.project;
            option.base = org;
        break;
    }

    console.dir(yargs);


    if (yargs.s) {
        gulp.start('server');
    }


    if (yargs.w) {
        gulp.start('watch');
    }
});
