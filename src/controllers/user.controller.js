import path from 'path';

export function getLogin(req,res){
  if(req.isAuthenticated()){
    res.render('login-ok',{
      usuario:req.user.username,
      nombre:req.user.firstname,
      apellido:req.user.lastName,
      email:req.user.email
    })
  }else{
    res.sendFile(path.resolve() + '/src/views/login.html');
  }
}

export function getFailLogin(req,res){
  console.log('Error en el login');
  res.render('login-error',{});
}

export function postLogin(req,res){
  if(req.isAuthenticated()){
    res.render('login-ok',{
      usuario:req.user.username,
      nombre:req.user.firstname,
      apellido:req.user.lastName,
      email:req.user.email
    })
  }else{
    res.sendFile(path.resolve() + '/src/views/index.html');
  }
}

export function getsignUp(req,res){
  res.sendFile(path.resolve() + '/src/views/signup.html');
}

export function postSignUp(req,res){
  if(req.isAuthenticated()){
    const {user} = req;
    return res.render('login-ok',{
      usuario:user.username,
      nombre:user.firstname,
      apellido:user.lastName,
      email:user.email
    });
  }
  res.sendFile(path.resolve() + '/src/views/index.html');
}

export function getFailSignUp(req,res){
  res.render('signup-error',{});
}

export function logout(req,res){
  req.session.destroy(err=>{
    if(!err){
      res.sendFile(path.resolve() + '/src/views/index.html');
    }
  })
}