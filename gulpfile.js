const gulp = require("gulp")
const less = require("gulp-less")
const sass = require('gulp-sass')(require('sass')) // дополнительно npm i sass --save-dev
const rename = require("gulp-rename") // позволяет менять имя. в нашем случае добавить *.min.*
const cssClean = require("gulp-clean-css") // удаляет ненужные пробелы, абзацы и т.д.
const babel = require("gulp-babel") // babel/core не подключаем отдельно
const uglify = require("gulp-uglify") //уинифицирует js
const concatCss = require('gulp-concat-css') //объединение стилей в 1н файл
const concat = require("gulp-concat") //объединение скриптов в 1н файл
const sourcemaps = require("gulp-sourcemaps") //показывает строку расположения стилей элемента в исходном файле
const autoprefixer = require('gulp-autoprefixer') //добавляет префиксы для различных браузеров
const imagemin = require('gulp-imagemin') //плагин для изображений. устанавливать npm i -D gulp-imagemin@7.1.0!!!!!!!
const htmlmin = require('gulp-htmlmin')
const del = require('del')

const paths = {
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    },
    styles: {
        src: 'src/css/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/images/*',
        dest: 'dist/images/'
    }
}

const clean = () => {
    return del(['dist/*.html, dist/css/*, dist/js/*'])
}

const html = () => {
    return gulp.src(paths.html.src)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest))
}

const styles = () => {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
			cascade: false
		}))
		.pipe(concatCss("styles.min.css"))
        .pipe(cssClean({
            level: 2
        }))
        .pipe(rename({
            basename: "style",
            suffix: ".min"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
}

const scripts = () => {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scripts.dest))
}

const img = () => {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))
}

//отслеживаем изменения в реальном времени
//автоматически компилирует файлы при изменении, ctrl + c - завершение задачи в консоли

const watch = () => { 
    gulp.watch(paths.html.src, html)
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts) 
}

//последовательное выполнение команд

const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img), watch)

//exports.clean = clean
exports.img = img
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build //для команды gulp, что тоже самое, как и gulp build