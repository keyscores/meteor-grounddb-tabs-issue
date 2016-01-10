TEST_DATA =
[
  { "customerTotal" : -5.5,  "timeStamp" : 1390107600,  "product" : "A", "country" : "US" },
  { "customerTotal" : 6.99, "timeStamp" : 1421643600, "product" : "B", "country" : "GB"},
]

Meteor.startup(function(){
    // START WITH FIXTURES, THEN USE METHOD 'broken' TO REFRESH
    COLL.remove({});
    //Insert all records above
    _.each(TEST_DATA, function(e){
      COLL.insert(e);
    });
});


Meteor.methods({
  broken: function(){
    //Clear all
    COLL.remove({});

    //Insert with BulkOp (THIS IS THE ONLY DIFFERENCE BETWEEN 'working' AND 'broken')
    var bulk = COLL.rawCollection().initializeUnorderedBulkOp();

    _.each(TEST_DATA, function ( i ) {
      // insert
      bulk.insert( i );
    });

    //Submit the bulk request
    Meteor.wrapAsync(bulk.execute)(function(error, result){
      if (result){
       console.log("inserted with bulkop");
      }
    });
    return
  }
});
