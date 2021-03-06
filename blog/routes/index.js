var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');

module.exports = function(app) {
  app.get('/', function(req,res) {
	//Post.get(null, function (err, posts) {
      if (err) {
        posts = [];
      } 
      res.render('index', {
        title: 'Home',
        user: req.session.user,
	    posts: posts,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
	//});  
  });

  app.get('/reg', checkNotLogin);
  app.get('/reg', function(req,res) {
    res.render('reg', {
      title: 'Register',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  
  app.post('/reg', checkNotLogin);
  app.post('/reg', function(req,res) {
    var name = req.body.name;
    var password = req.body.password;
    var password_re = req.body['password-repeat'];
  
    if (password_re != password) {
      req.flash('error', 'two passwords are not the same.'); 
      return res.redirect('/reg');
    } 
  
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
      name: name,
      password: password,
      email: req.body.email
    });
  
    User.get(newUser.name, function (err, user) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      if (user) {
        req.flash('error', 'User existed!');
        return res.redirect('/reg');
      }
    
      newUser.save(function (err, user) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/reg');
        }
        req.session.user = newUser;
        req.flash('success', 'Register successfully!');
        res.redirect('/');
      });
    }); 
  });
  
  app.get('/login', checkNotLogin);
  app.get('/login', function(req,res) {
    res.render('login', {
      title: 'Login',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  
  app.post('/login', checkNotLogin);
  app.post('/login', function(req,res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('hex');
  
    User.get(req.body.name, function (err, user) {
      if (!user) {
        req.flash('error', 'User not existed!'); 
        return res.redirect('/login');
      }
   
      if (user.password != password) {
        req.flash('error', 'Incorrect password!'); 
        return res.redirect('/login');
      }
      req.session.user = user;
      req.flash('success', 'Login successfully!');
      res.redirect('/');
    });
  });

  app.get('/post', checkLogin);
  app.get('/post', function(req,res) {
    res.render('post', {
	  title: 'Post',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
	});
  });
  
  app.post('/post', checkLogin);
  app.post('/post', function(req,res) {
	var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.title, req.body.post);
    post.save(function (err) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('/');
      }
      req.flash('success', 'Post Successfully!');
      res.redirect('/');
    });
  });

  app.get('/logout', checkLogin);
  app.get('/logout', function(req,res) {
    req.session.user = null;
    req.flash('success', 'Logout Successfully!');
    res.redirect('/');
  }); 

  function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'not logged in!'); 
      res.redirect('/login');
    }
    next();
  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', 'already logged in!'); 
      res.redirect('back');
    }
    next();
  }  
};
