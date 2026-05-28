/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3607937828")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != \"\"",
    "deleteRule": "author = @request.auth.id || @request.auth.role = \"admin\"",
    "listRule": "visibility = \"public\" || (author = @request.auth.id || @request.auth.role = \"admin\")",
    "updateRule": "author = @request.auth.id || @request.auth.role = \"admin\"",
    "viewRule": "visibility = \"public\" || (author = @request.auth.id || @request.auth.role = \"admin\")"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3607937828")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
