const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
// const browserSync = require('browser-sync')

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
      .pipe(gulp.dest('public/stylesheets'))
  )

  done()
})

gulp.task('watch', (done) => {
  gulp.watch('dev/scss/**/*.scss', gulp.series('scss'))
  done()
})

gulp.task('default', gulp.parallel('scss', 'watch'))