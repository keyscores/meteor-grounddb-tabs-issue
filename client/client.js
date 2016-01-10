Template.hello.events({
  "click #broken": function(event, template){
     Meteor.call("broken", function(error, result){
       if(error){
         console.log("error", error);
       }
       if(result){

       }
     });
  }
});

Template.hello.helpers({
  myCollection: function () {
      return COLL.find({}).fetch();
  },

});
