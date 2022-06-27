const fs = require('fs').promises;
const genThumbnail = require('simple-thumbnail');

String.prototype.removeUnwantedCharacters = function () {
  return this.replaceAll('.', '_')
    .replaceAll(' ', '_')
    .replaceAll('-', '_')
    .replaceAll("'", '')
    .replaceLast('_', '.');
};

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

const getDirectories = async source =>
  (await fs.readdir(source, {withFileTypes: true}))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

getDirectories('./assets').then(item => {
  fs.writeFile(
    './assets/folders.js',
    `export const folders = [${item.map(folder => `'${folder}'`)}];`
  );
});

fs.unlink('./assets/thumbnailsIndex.js').then(() =>
  fs.unlink('./assets/videosIndex.js').then(() =>
    fs.readdir('./assets/').then(folders => {
      folders.filter(folder => {
        fs.stat('./assets/' + '/' + folder).then(item => {
          if (item.isDirectory() && folder !== 'thumbnails') {
            fs.readdir(`./assets/${folder}`).then(file => {
              file.map(fileName => {
                fs.rename(
                  `./assets/${folder}/${fileName}`,
                  `./assets/${folder}/${changeExt(
                    !fileName.startsWith(folder.toUpperCase())
                      ? folder.toUpperCase() + fileName
                      : fileName,
                    'mp4'
                  ).removeUnwantedCharacters()}`,
                  err => err && console.log(err)
                ).then(() => {
                  console.log('filename ====>', fileName);
                  console.log('folder ====>', folder);
                  genThumbnail(
                    `./assets/${folder}/${
                      !fileName.startsWith(folder.toUpperCase())
                        ? folder.toUpperCase() +
                          fileName.removeUnwantedCharacters()
                        : fileName.removeUnwantedCharacters()
                    }`,
                    `./assets/thumbnails/generated/${
                      //might remove folder
                      !fileName.startsWith(folder.toUpperCase())
                        ? folder.toUpperCase() +
                          fileName
                            .removeUnwantedCharacters()
                            .replace('mp4', 'png')
                        : fileName
                            .removeUnwantedCharacters()
                            .replace('mp4', 'png')
                    }`,
                    '250x?',
                    {seek: '00:00:02.23'}
                  )
                    .then(() => {
                      const res = `export { default as  ${
                        !isNaN(fileName.replace('.mp4', '')) ? '_' : ''
                      }${
                        changeExt(
                          !fileName.startsWith(folder.toUpperCase())
                            ? folder.toUpperCase() + fileName
                            : fileName,
                          'mp4'
                        )
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
                      } } from './${folder}/${changeExt(
                        !fileName.startsWith(folder.toUpperCase())
                          ? folder.toUpperCase() + fileName
                          : fileName,
                        'mp4'
                      )
                        .replaceAll('-', '_')
                        .replaceAll("'", '')
                        .replaceAll('.', '_')
                        .replaceAll(' ', '_')
                        .replaceLast('_', '.')}'; \n`;
                      fs.appendFile('./assets/videosIndex.js', res).then(() => {
                        const res2 = `export { default as  ${
                          !isNaN(fileName.replace('.png', '')) ? '_' : ''
                        }${
                          changeExt(
                            !fileName.startsWith(folder.toUpperCase())
                              ? folder.toUpperCase() + fileName
                              : fileName,
                            'png'
                          )
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
                        }_thumbnail } from './thumbnails/generated/${changeExt(
                          !fileName.startsWith(folder.toUpperCase())
                            ? folder.toUpperCase() + fileName
                            : fileName,
                          'png'
                        )
                          .replaceAll('-', '_')
                          .replaceAll("'", '')
                          .replaceAll('.', '_')
                          .replaceAll(' ', '_')
                          .replaceLast('_', '.')}'; \n`;
                        fs.appendFile('./assets/thumbnailsIndex.js', res2);
                      });
                    })
                    .catch(err => console.error(err));
                });
              });
            });
          }
        });
      });
    })
  )
);
