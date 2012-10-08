# README

## create test users

'''
for (var i = 0; i < 1000; i ++) { 
    db.Users.save({_id:i, order:  Math.ceil(Math.random()*100)});  
}
'''

