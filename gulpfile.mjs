import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;

import ejs from 'gulp-ejs';
import htmlmin from 'gulp-htmlmin';

import gulpSass from 'gulp-sass';
import * as sassCompiler from 'sass';
import cleanCSS from 'gulp-clean-css';

import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import browserSyncModule from 'browser-sync';

const sass = gulpSass(sassCompiler);
const browserSync = browserSyncModule.create();

// HTML（EJS）コンパイル
function compileHTML() {
  return src(['src/**/*.ejs', '!src/**/_*.ejs'])
    .pipe(plumber())
    .pipe(ejs({}, {}, { ext: '.html' }))
    .pipe(rename({ extname: '.html' }))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// Sass コンパイル
function compileCSS() {
  return src('src/**/*.scss', { base: 'src' })
    .pipe(plumber())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(dest('dist/assets'))  // assets配下に吐き出す
    .pipe(browserSync.stream());
}

// JavaScript 圧縮
function compileJS() {
  return src('src/**/*.js', { base: 'src' })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/assets'))
    .pipe(browserSync.stream());
}

// 画像圧縮
function compileIMG() {
  return src('src/**/*.{png,jpg,jpeg,gif}', { base: 'src/' })
    .pipe(imagemin())
    .pipe(dest('dist/assets'));
}

// ファイル監視
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  watch('src/**/*.ejs', compileHTML);
  watch('src/scss/**/*.scss', compileCSS);
  watch('src/js/**/*.js', compileJS);
  watch('src/images/**/*', compileIMG);
}

export { compileHTML, compileCSS, compileJS, compileIMG };
export default series(
  parallel(compileHTML, compileCSS, compileJS, compileIMG),
  watchFiles
);