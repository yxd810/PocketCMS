/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3607937828")

  // add field
  collection.fields.addAt(8, new Field({
    "help": "",
    "hidden": false,
    "id": "select1602912115",
    "maxSelect": 0,
    "name": "source",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "editor",
      "file_manager"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3607937828")

  // remove field
  collection.fields.removeById("select1602912115")

  return app.save(collection)
})
