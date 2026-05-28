/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "@request.auth.id != ''",
    "deleteRule": "author = @request.auth.id || @request.auth.role = 'admin'",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "help": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text724990059",
        "max": 200,
        "min": 0,
        "name": "title",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "help": "",
        "hidden": false,
        "id": "select2363381545",
        "maxSelect": 0,
        "name": "type",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "article, note, file"
        ]
      },
      {
        "convertURLs": false,
        "help": "",
        "hidden": false,
        "id": "editor4274335913",
        "maxSize": 0,
        "name": "content",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "editor"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text3458754147",
        "max": 500,
        "min": 0,
        "name": "summary",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "help": "",
        "hidden": false,
        "id": "file2366146245",
        "maxSelect": 0,
        "maxSize": 0,
        "mimeTypes": null,
        "name": "cover",
        "presentable": false,
        "protected": false,
        "required": false,
        "system": false,
        "thumbs": null,
        "type": "file"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "help": "",
        "hidden": false,
        "id": "relation3182418120",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "author",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
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
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "help": "",
        "hidden": false,
        "id": "relation577145238",
        "maxSelect": 10,
        "minSelect": 0,
        "name": "shared_with",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
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
      },
      {
        "help": "",
        "hidden": false,
        "id": "date3639656976",
        "max": "",
        "min": "",
        "name": "share_expires",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "help": "",
        "hidden": false,
        "id": "json1874629670",
        "maxSize": 0,
        "name": "tags",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "help": "",
        "hidden": false,
        "id": "number3891979121",
        "max": null,
        "min": 0,
        "name": "view_count",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_4105455982",
    "indexes": [],
    "listRule": "visibility = 'public' || (@request.auth.id != '' && (author = @request.auth.id || visibility = 'private' && author = @request.auth.id || visibility = 'shared' && shared_with ~ @request.auth.id))",
    "name": "contents",
    "system": false,
    "type": "base",
    "updateRule": "author = @request.auth.id || @request.auth.role = 'admin'",
    "viewRule": "visibility = 'public' || (@request.auth.id != '' && (author = @request.auth.id || visibility = 'private' && author = @request.auth.id || visibility = 'shared' && shared_with ~ @request.auth.id))\n"
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4105455982");

  return app.delete(collection);
})
