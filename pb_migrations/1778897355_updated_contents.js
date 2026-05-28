/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4105455982")

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text1625733110",
    "max": 0,
    "min": 0,
    "name": "shared_password",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text2706983974",
    "max": 0,
    "min": 0,
    "name": "shared_token",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4105455982")

  // remove field
  collection.fields.removeById("text1625733110")

  // update field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text2706983974",
    "max": 0,
    "min": 0,
    "name": "shared_token",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
