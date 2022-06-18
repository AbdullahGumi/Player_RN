const fs = require('fs');
const genThumbnail = require('simple-thumbnail');

const videosDirectory = './assets/videos/';
const thumbnailsDirectory = './assets/thumbnails/';

String.prototype.replaceLast = function (search, replace) {
  return this.replace(
    new RegExp(search + '([^' + search + ']*)$'),
    replace + '$1'
  );
};

function changeExt(fileName, newExt) {
  var pos = fileName.includes('.')
    ? fileName.lastIndexOf('.')
    : fileName.length;
  var fileRoot = fileName.substr(0, pos);
  var output = `${fileRoot}.${newExt}`;
  return output;
}

const renameFiles = async () => {
  console.log('renaming files ===========================>');
  //rename video files
  fs.readdirSync(videosDirectory).map(file => {
    fs.rename(
      `${videosDirectory}${file}`,
      `${videosDirectory}${changeExt(file, 'mp4')
        .replaceAll('.', '_')
        .replaceAll(' ', '_')
        .replaceAll('-', '_')
        .replaceAll("'", '')
        .replaceLast('_', '.')}`,
      err => err && console.log(err)
    );
  });
};

renameFiles().then(() => {
  // generate thumbnails
  setTimeout(() => {
    console.log('generating thumbnails ===========================>');
    fs.readdirSync(videosDirectory).map(file => {
      genThumbnail(
        `${videosDirectory}${file}`,
        `./assets/thumbnails/${file.replace('mp4', 'png')}`,
        '250x?',
        {seek: '00:00:02.23'}
      )
        .then(() => {})
        .catch(err => console.error(err));
    });
  }, 2000);
});

//filter extensions
const exportVideos = async () => {
  setTimeout(() => {
    const filtered = fs
      .readdirSync(videosDirectory)
      .filter(
        x =>
          x.includes('mp4') ||
          x.includes('mkv') ||
          x.includes('mov') ||
          x.includes('wmv') ||
          x.includes('webm') ||
          x.includes('html5')
      );

    // export as default
    const res = filtered
      .map(
        file =>
          `export { default as  ${!isNaN(file.replace('.mp4', '')) ? '_' : ''}${
            changeExt(file, 'mp4')
              .replaceAll('-', '_')
              .replaceAll("'", '')
              .replaceAll('.', '_')
              .replaceAll('(', '_')
              .replaceAll(')', '_')
              .replaceAll('[', '_')
              .replaceAll(']', '_')
              .replaceAll('~', '_')
              .replaceAll(' ', '_')
              .split('_mp4')[0]
          } } from './videos/${changeExt(file, 'mp4')
            .replaceAll('-', '_')
            .replaceAll("'", '')
            .replaceAll('.', '_')
            .replaceAll(' ', '_')
            .replaceLast('_', '.')}';`
      )
      .join('\n');
    fs.writeFileSync('./assets/videosIndex.js', res);
  }, 3000);
};

//after exporting videos then export thumbnails
exportVideos().then(() => {
  setTimeout(() => {
    console.log('exporting thumbnails =============>');
    const res = fs
      .readdirSync(thumbnailsDirectory)
      .map(
        (file, i) =>
          `${i === 0 ? '\n' : ''}export { default as  ${
            !isNaN(file.replace('.png', '')) ? '_' : ''
          }${
            changeExt(file, 'png')
              .replaceAll('-', '_')
              .replaceAll("'", '')
              .replaceAll('.', '_')
              .replaceAll('(', '_')
              .replaceAll(')', '_')
              .replaceAll('[', '_')
              .replaceAll(']', '_')
              .replaceAll('~', '_')
              .replaceAll(' ', '_')
              .split('_png')[0]
          }_thumbnail } from './thumbnails/${changeExt(file, 'png')
            .replaceAll('-', '_')
            .replaceAll("'", '')
            .replaceAll('.', '_')
            .replaceAll(' ', '_')
            .replaceLast('_', '.')}';`
      )
      .join('\n');
    fs.writeFileSync('./assets/thumbnailsIndex.js', res);
  }, 15000);
});
