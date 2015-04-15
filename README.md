# VagrantPress

*VagrantPress* is a packaged development environment for developing WordPress themes and modules.  
I initially created this project to aid in developing child modules for a WordPress blog.

# What's Installed

+ Ubuntu Trusty (14.04)
+ Wordpress 4.0
+ Mysql
+ Php
+ Phpmyadmin
+ Subversion
+ Git

**PEAR removed as support has reached end of life, see [End of Life for PEAR Installation Method](https://github.com/sebastianbergmann/phpunit/wiki/End-of-Life-for-PEAR-Installation-Method)*

# Prerequisites

+ [Vagrant](http://www.vagrantup.com/downloads.html)
+ [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
+ [Vagrant Hostsupdater](https://github.com/cogitatio/vagrant-hostsupdater)

## Getting Started

This is a fairly simple project to get up and running.  
The procedure for starting up a working WordPress is as follows:

1. Clone the project.  (There’s only master branch.)
2. Run `vagrant plugin install vagrant-hostsupdater` from command line
2. Run the command `vagrant up` from the directory
3. Open your browser to http://vagrantpress.dev

## Working with the environment

To log in to the local Wordpress installation:

`http://vagrantpress.dev/wp-admin/` the username is `admin`, the password is `vagrant`.

You can access phpMyAdmin:

`http://vagrantpress.dev/phpmyadmin/` with username `wordpress`, password `wordpress`.

## A Few Details

* If you're needing a password (for anything - including mysql, it should be `vagrant`)

## Getting Help

Feel free to file an issue, create a pull request, or contact me at [my website][chadthompson].

[chadthompson]: http://chadthompson.me

# Changelog @andreacanton
+ Set apache to allow override by .htaccess files
+ Comment composer and phpqa classes (I don't use them in my developing process - for now)
+ Remove automatic installation of wordpress and wordpress test (so you can choose admin user, website name, language and table prefix)
+ Add default Gruntfile.js + package.json
+ Install bones theme

# TODO
+ Remove default themes and add bones
+ Wordpress cli install (change provisioner to chef?)
+ Prompt set domain and default ip (change provisioner to chef?)


