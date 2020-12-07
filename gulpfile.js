const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')

gulp.task('scss', (done) => {
  return (
    gulp
      .src('dev/scss/**/*.scss')
      // .pipe(plumber())
      .pipe(sass())
      .pipe(
        autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
          cascade: true,
        })
      )
      .pipe(cssnano())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload({ stream: true }))
  )

  done()
})

gulp.task('browser-sync', (done) => {
  browserSync.init({
    server: {
      baseDir: './dist/',
    },
  })

  gulp.watch('dev/scss/**/*.scss', gulp.series('scss'))
  gulp.watch('dist/*.html').on('change', () => {
    browserSync.reload()
    done()
  })

  gulp.watch('dist/**/*.css').on('change', () => {
    browserSync.reload()
    done()
  })

  done()
})

gulp.task('default', gulp.parallel('scss', 'browser-sync'))
