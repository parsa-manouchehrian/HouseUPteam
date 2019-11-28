
let services = db.collection("Contractors").doc("JPPQs9Amk90ZW7rfQ7sn");

services.get().then(function (doc) {
    if (doc.exists) {
        console.log(doc.data().Services);
    } else {
        console.log("No DATA")
    }
})