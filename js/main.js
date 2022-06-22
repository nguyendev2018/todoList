// set up
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const pending = "pending";
const complete = "complete";
const getLocalList = getLocal();
if (getLocalList == null) {
    const todoList = [];
    setLocal(todoList)
}
function getLocal() {
    return JSON.parse(localStorage.getItem("todoList"))
}
function setLocal(todoList) {
    return localStorage.setItem("todoList", JSON.stringify(todoList))
}
function getValueForm(event) {
    event.preventDefault();
    const todoText = $("#todoText").value;
    itemObject(todoText);
}
function itemObject(todoText) {
    const item = {
        id: Date.now(),
        title: todoText,
        status: "pending"
    };
    const get = getLocal();
    get.push(item);
    setLocal(get)
};

; (() => {
    $("#todoFormId").addEventListener("submit", getValueForm);

})()