/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_533777971")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_4105455982",
    "help": "",
    "hidden": false,
    "id": "relation2225120237",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "content_id",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_533777971")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4105455982",
    "help": "",
    "hidden": false,
    "id": "relation2225120237",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "content_id",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
