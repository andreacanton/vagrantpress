# Install postfix

class postfix::install {

  package{'postfix':
    ensure=>present,
  }

}
