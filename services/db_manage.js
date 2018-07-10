function delete_db(){
  request.post({url:'http://localhost:3000/candidates_remove', form: {login : '123'}}, function(err,httpResponse,body){
      console.log(body)
  })
}
