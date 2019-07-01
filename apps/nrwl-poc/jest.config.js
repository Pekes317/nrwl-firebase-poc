module.exports = {
  name: 'nrwl-poc',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nrwl-poc',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
