// 1. Імпорт модулів
const { src, dest, watch, series, parallel } = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Шляхи для зручності
const paths = {
    src: 'src/',
    dist: 'dist/'
};

// 2. Таск для HTML (обробка HTML з file include)
function htmlTask() {
    return src(paths.src + 'index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest(paths.dist))
        .pipe(browserSync.stream());
}

// 3. Таск для SCSS (компіляція та мініфікація)
function scssTask() {
    return src(paths.src + 'scss/**/*.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(dest(paths.dist + 'css', { sourcemaps: '.' }))
        .pipe(browserSync.stream());
}

// 4. Таск для JavaScript (мініфікація)
function jsTask() {
    return src(paths.src + 'js/**/*.js', { sourcemaps: true })
        .pipe(uglify())
        .pipe(dest(paths.dist + 'js', { sourcemaps: '.' }))
        .pipe(browserSync.stream());
}

// 5. Таск для зображень (оптимізація)
function imgTask() {
    return src(paths.src + 'imgs/**/*')
        .pipe(imagemin())
        .pipe(dest(paths.dist + 'imgs'));
}

// 6. Таск для Server (синхронізація з браузером)
function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: paths.dist
        }
    });
    cb();
}

// 7. Таск Watch (відстеження змін)
function watchTask() {
    watch([paths.src + '**/*.html'], htmlTask);
    watch([paths.src + 'scss/**/*.scss'], scssTask);
    watch([paths.src + 'js/**/*.js'], jsTask);
    watch([paths.src + 'imgs/**/*'], imgTask);
}

// 8. Таск "default" (запуск збірки та watcher)
exports.default = series(
    parallel(htmlTask, scssTask, jsTask, imgTask), 
    browserSyncServe,
    watchTask 
);

exports.build = parallel(htmlTask, scssTask, jsTask, imgTask);