import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  //namespace: '/api',
  initialize(){
    return this.request('http://localhost:3000/posts/', {
      method: 'GET'
    }).then((response) => {
       return response;
    })
  },
  addNewPost(data){
    return this.request('http://localhost:3000/posts/', {
      method: 'POST',
      data: data
    }).then((response) => {
       return response;
    })
  },
  updatePost(id,data){
    return this.request('http://localhost:3000/posts/'+id, {
      method: 'PUT',
      data: data
    }).then((response) => {
       return response;
    })
  },
  delPost(postId){
    return this.request('http://localhost:3000/posts/'+postId, {
      method: 'DELETE'
    }).then((response) => {
       return response;
    })
  }
});
