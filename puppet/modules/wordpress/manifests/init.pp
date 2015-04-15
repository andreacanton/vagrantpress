# Install latest Wordpress

class wordpress::install {

  # Create the Wordpress database
  exec { 'create-database':
    unless  => '/usr/bin/mysql -u root -pvagrant wordpress',
    command => '/usr/bin/mysql -u root -pvagrant --execute=\'create database wordpress\''
  }

  exec { 'create-user':
    unless  => '/usr/bin/mysql -u wordpress -pwordpress wordpress',
    command => '/usr/bin/mysql -u root -pvagrant --execute="GRANT ALL PRIVILEGES ON wordpress.* TO \'wordpress\'@\'localhost\' IDENTIFIED BY \'wordpress\'"'
  }

  # Get a new copy of the latest wordpress release
  # FILE TO DOWNLOAD: http://wordpress.org/latest.tar.gz

  exec { 'download-wordpress': #tee hee
    command => '/usr/bin/wget http://wordpress.org/latest.tar.gz',
    cwd     => '/vagrant/',
    creates => '/vagrant/latest.tar.gz'
  }

  exec { 'untar-wordpress':
    cwd     => '/vagrant/',
    command => '/bin/tar xzvf /vagrant/latest.tar.gz',
    require => Exec['download-wordpress'],
    creates => '/vagrant/wordpress'
  }
  # download bones theme
  exec{ 'install-bones-theme' :
    command => '/usr/bin/git clone https://github.com/eddiemachado/bones.git',
    cwd     => '/vagrant/wordpress/wp-content/themes/',
    require => [
      Package['git'],
      Exec['untar-wordpress']
    ],
    creates => '/vagrant/wordpress/wp-content/themes/bones'
  }
  exec { 'remove-bones-git-repository' :
    command => 'rm -rf .git*',
    cwd => '/vagrant/wordpress/wp-content/themes/bones',
    require => Exec['install-bones-theme']
  }
  # import grunt's files
  file {
    '/vagrant/wordpress/Gruntfile.js':
      source  => '/vagrant/files/grunt/Gruntfile.js',
      require => Exec['untar-wordpress'];
    '/vagrant/wordpress/package.json':
      source  => '/vagrant/files/grunt/package.json',
      require => Exec['untar-wordpress'];
  }
  # compass config files
  file {
    '/vagrant/wordpress/dev-config.rb':
      source  => '/vagrant/files/compass/dev-config.rb',
      require => Exec['untar-wordpress'];
    '/vagrant/wordpress/prod-config.rb':
      source  => '/vagrant/files/compass/prod-config.rb',
      require => Exec['untar-wordpress']
  }
  # gitignore
  file {
    '/vagrant/wordpress/.gitignore':
      source  => '/vagrant/files/git/.gitignore',
      require => Exec['untar-wordpress']
  }

}
