module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder,
        filter: (val) => val.toLowerCase(),
      },
      {
        name: 'description',
        message: 'How would you describe the new project',
        default: 'my Awesome project',
      },
      {
        name: 'username',
        message: 'What is your GitHub username',
        default: this.gitUser.username || this.gitUser.name,
        filter: (val) => val.toLowerCase(),
        store: true,
      },
      {
        name: 'email',
        message: 'What is your email?',
        default: this.gitUser.email,
        store: true,
      },
      {
        message: 'The URL of your website',
        default({ username }) {
          return `github.com/${username}`;
        },
        store: true,
      },
    ];
  },
  actions: [
    {
      type: 'add',
      // Copy and transform all files in `template` folder into output directory
      files: '**',
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
      },
    },
  ],
  async completed() {
    this.gitInit();
    await this.npmInstall();
    console.log('Happy hacking');
    // this.showProjectTips();
  },
};
