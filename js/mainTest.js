// setup 
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const templateList = $("#todoList");

let getTodo = getLocal();
if (getTodo == null) {
    let todoList = [];
    setLocal(todoList);
}
function renderTodoList(templateList, getTodo) {
    if (!Array.isArray(getTodo) || getTodo.length === 0) return;
    let content = "";
    getTodo.map((item) => {
        content += `
        <li class="item-list alert" data-status=${item.status} data-id=${item.id}>
            <div class="todo ">
                <div class="d-flex justify-content-between align-items-center">
                    <p class="todo__title mb-0">${item.title} </p>
                    <div class="todo__actions">
                        <button type="button" class="btn btn-success mark-as-done">Finish </button>
                        <button type="button" class="btn btn-danger remove">Remove </button>
                    </div>
                </div>
            </div>
        </li>
        `
    });
    templateList.innerHTML = content;

}
function renderStatus() {
    let itemList = $$("#todoList .item-list");
    itemList.forEach(element => {
        changeCss(element)
    })
}
function changeCss(element) {
    let getDataSet = element.dataset.status === "complete" ? "alert-success" : "alert-warning";
    element.classList.remove("alert-success", "alert-warning")
    element.classList.add(getDataSet);
}
function changeStatus(element) {
    const todoList = getLocal();
    const newStatus = element.dataset.status === "complete" ? "pending" : "complete";
    element.dataset.status = newStatus;
    const index = todoList.findIndex(x => x.id == element.dataset.id);
    todoList[index].status = newStatus;
    setLocal(todoList);
}
function handleTodoFormSubmit(event) {
    event.preventDefault();
}
function clickBtn() {
    let itemList = $$("#todoList .item-list");
    itemList.forEach((element) => {
        element.addEventListener("click", function (e) {
            let clickFinish = e.target.closest(".mark-as-done");
            let clickDelete = e.target.closest(".remove");
            if (clickFinish) {
                finishFn(element);
            }
            else if (clickDelete) {
                deleteFn(element);
            }
            if (!clickDelete || !clickFinish) return;
        })
    });
}
function deleteFn(element) {
    const todoList = getLocal();
    const newTodoList = todoList.filter(x => x.id != element.dataset.id);
    setLocal(newTodoList);
    element.remove();
};
function finishFn(element) {
    changeStatus(element)
    changeCss(element)
}
function getLocal() {
    try {
        return JSON.parse(localStorage.getItem("todoList"));
    } catch {
        return []
    }
}
function setLocal(todoList) {
    return localStorage.setItem("todoList", JSON.stringify(todoList))
}
function getValueForm(e) {
    e.preventDefault();
    const todoText = $("#todoText").value;
    $("#todoText").value = "";
    objectNow(todoText);
}
function objectNow(todoText) {
    const objectItem = {
        id: Date.now(),
        title: todoText,
        status: "pending"
    }
    const getTodo = getLocal();
    getTodo.push(objectItem);
    setLocal(getTodo);
    renderTodoList(templateList, getTodo);
    renderStatus();
    clickBtn();
}
; (() => {
    $("#todoFormId").addEventListener("submit", getValueForm)
    renderTodoList(templateList, getTodo);
    renderStatus();
    clickBtn();
})() 