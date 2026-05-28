/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4105455982")

  // update field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "select1368277760",
    "maxSelect": 0,
    "name": "visibility",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "public",
      "private",
      "shared"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4105455982")

  // update field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "select1368277760",
    "maxSelect": 0,
    "name": "visibility",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "public, private, shared;"
    ]
  }))

  return app.save(collection)
})
