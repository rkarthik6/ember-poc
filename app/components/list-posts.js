import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service('servlet'),
    showForm: false,
    isEditable: false,
    postList: [],
    init() {
        this._super(...arguments);
        let store = this.get('store');
        store.initialize().then((response) => {
            this.set('postList', response);
        });
    },
    actions: {
        showForm: function() {
            this.set('showForm', true);
        },
        hideForm: function(val) {
            this.set('showForm', val);
        },
        addPost: function(newpost) {
            this.get('postList').pushObject(newpost);
        },
        editPost: function(post) {
            this.set('isEditable', true);
            this.set('showForm', true);
            this.set('editPost', post);
        },
        updatePost: function(post) {
            this.set('showForm', false);
            let List = this.get('postList');
            let updatedPost = List.findBy('id', post.id);
            List.replace(List.indexOf(updatedPost), 1, post);
        },
        deletePost(post) {
            let store = this.get('store');
            store.delPost(post.id).then((response) => {
                this.get('postList').removeObject(post);
            });
        }

    }
});