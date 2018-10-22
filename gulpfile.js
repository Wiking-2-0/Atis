    "use strict";
    var gulp       = require('gulp'), // Подключаем Gulp
        sass         = require('gulp-sass'), //Подключаем Sass пакет,
        browserSync  = require('browser-sync'), // Подключаем Browser Sync
        concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
        uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
        cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
        rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
        del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
        imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
        svgmin     = require('gulp-svgmin'), // Подключаем библиотеку для оптимизации svg
        pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
        cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
        rigger       = require('gulp-rigger');

    gulp.task('html', function () {
      return gulp.src('app/html/*.html') //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest('app')) //Выплюнем их в папку build
        .pipe(browserSync.reload({stream: true})) //И перезагрузим наш сервер для обновлений
      });

    gulp.task('sass',  function(){ // Создаем таск Sass
        return gulp.src('app/sass/style.scss') // Берем источник
            .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
            .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
            .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
          });

    gulp.task('browser-sync', function() { // Создаем таск browser-sync
        browserSync({ // Выполняем browserSync
            server: { // Определяем параметры сервера
                baseDir: 'app' // Директория для сервера - app
              },
            notify: false // Отключаем уведомления
          });
      });

    gulp.task('scripts', function() {
        return gulp.src([ // Берем все необходимые библиотеки
            'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
            'app/libs/owl.carousel/dist/owl.carousel.min.js',
            'app/libs/bootstrap/dist/js/bootstrap.min.js',
            'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
            'app/libs/revealator/fm.revealator.jquery.min.js',
            'app/libs/bootstrap-sass/assets/javascripts/bootstrap.min.js',
            'app/libs/jquery-validation/dist/jquery.validate.min.js',
            'app/libs/swiper/dist/js/swiper.min.js'
            ])
            .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
            .pipe(uglify()) // Сжимаем JS файл
            .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
          });

    gulp.task('css-libs', ['sass'], function() {
        return gulp.src('app/css/style.css') // Выбираем файл для минификации
            .pipe(cssnano()) // Сжимаем
            .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
            .pipe(gulp.dest('dist/css')); // Выгружаем в папку dist/css
          });

    gulp.task('watch', ['browser-sync', 'html', 'sass', 'scripts'], function() {
        gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
        gulp.watch( 'app/html/**/*.html', ['html']); // Наблюдение за HTML файлами в корне проекта
        gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
      });

    gulp.task('clean', function() {
        return del.sync('dist'); // Удаляем папку dist перед сборкой
      });

    gulp.task('img', function() {
        return gulp.src('app/img/*') // Берем все изображения из app
            .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
              interlaced: true,
              progressive: true,
              svgoPlugins: [{removeViewBox: false}],
              use: [pngquant()]
            })))
            .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
          });
    gulp.task('svg', function() {
        return gulp.src('app/img/icons/*') // Берем все изображения из img/icons
            .pipe(cache(svgmin()))
            .pipe(gulp.dest('dist/img/icons')); // Выгружаем на продакшен
          });

    gulp.task('build', ['clean', 'img', 'svg', 'css-libs', 'scripts'], function() {

      /*var buildLibs = gulp.src('app/libs/bootstrap/dist/css/bootstrap.min.css')
       .pipe(gulp.dest('dist/libs/bootstrap/dist/css'))
      var buildLibsOC = gulp.src('app/libs/owl.carousel/dist/assets/owl.carousel.min.css')
        .pipe(gulp.dest('dist/libs/owl.carousel/dist/assets'))*/
      var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

        var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

        var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));
         // var buildVideo = gulp.src('app/video/*')
        //   .pipe(gulp.dest('dist/video'));
      });

    gulp.task('clear', function () {
      return cache.clearAll();
    });

