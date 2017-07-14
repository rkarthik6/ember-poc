import Ember from 'ember';

export default Ember.Component.extend({
    isEditable: false,
    store: Ember.inject.service('servlet'),
    init() {
        this._super(...arguments);
        let isEditable = this.get('isEditable');
        let editedpost = this.get('editedPost');
        if (isEditable) {
            this.set('title', editedpost.title);
            this.set('body', editedpost.body);
        }

    },
    actions: {
        addPost: function() {
            let store = this.get('store');
            let newPost = {};
            newPost.title = this.get('title');
            newPost.body = this.get('body');
            if (this.get('isEditable')) {
                let editedPost = this.get('editedPost');
                let updatedPost = {};
                updatedPost.id = editedPost.id;
                updatedPost.title = editedPost.title;
                updatedPost.body = editedPost.body;
                store.updatePost(editedPost.id, newPost).then((response) => {
                    this.sendAction('postUpdate', response);
                });
            } else {
                store.addNewPost(newPost).then((response) => {
                    this.sendAction('sendPost', response);
                    this.set('title', '');
                    this.set('body', '');
                });
            }
        },
        cancel: function() {
            this.sendAction('sendForm', false);
        }
    }
});