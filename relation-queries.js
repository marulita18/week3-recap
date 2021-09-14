const User = require("./models").user;
const TodoList = require("./models").todoList;
const TodoItem = require("./models").todoItem;
const Tag = require("./models").tag;

async function getUser(id) {
  const userById = await User.findByPk(id, {
    include: TodoList,
  });
  console.log(userById);
  return userById.toJSON;
}

// getUser(1);

async function getImportant() {
  const importantTasks = await TodoItem.findOne({
    where: { important: true },
    include: TodoList,
  });
  console.log(importantTasks);
  return importantTasks.toJSON;
}
// getImportant();

async function getUserAndTask(id) {
  const userId = await User.findByPk(id, {
    include: {
      model: TodoList,
      include: { model: TodoItem, attributes: ["task"] },
    },
  });
  console.log(userId);
  return userId.toJSON;
}

// getUserAndTask(2);

async function itemsWithTags() {
  const withTags = await TodoItem.findAll({
    include: [Tag],
  });
  console.log(withTags);
  return withTags.map(item.get({ plain: true }));
}
itemsWithTags();
