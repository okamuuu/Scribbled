echo << EOS
for (var i = 0; i < 1000; i ++) { 
   db.User.save({_id:i, money: 100}); 
}
EOS | mongo 
