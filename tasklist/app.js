// 获取节点
const form = document.querySelector('#task-form')
const taskInput = document.querySelector('#task')
const filter = document.querySelector('#filter')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')

// 加载所有事件监听
loadEventListeners();

// 加载所有事件监听函数
function loadEventListeners(){
    // DOM内容加载完毕执行
    document.addEventListener('DOMContentLoaded', getTask);

    // 添加任务事件
    form.addEventListener('submit', addTask);
    // 删除任务
    taskList.addEventListener('click', removeTask);
    // 清除所有任务
    clearBtn.addEventListener('click',clearTasks);

    filter.addEventListener('keyup', filterTasks);
}


// addTask
function addTask(e){
    if(taskInput.value == ""){
        alert("Add a task")
    }else{
        /*
        1.创建li；2.创建a标签，插入图标；
        3.将a标签插入li中，将li插入ul中。
        */

        // 创建li
        const li = document.createElement('li');
        // 添加li类名
        li.className = "collection-item";
        // 创建文本节点，插入li中
        li.appendChild(document.createTextNode(taskInput.value));

        // 创建a标签
        const link = document.createElement('a');
        // 添加a标签的类名
        link.className = "delete-item secondary-content";
        // 添加字体图标
        link.innerHTML = '<i class="fa fa-times"></i>';
        
        // 将a标签插入li中
        li.appendChild(link);
        // 将li插入ul
        taskList.appendChild(li);


        // 将添加的任务进行本地存储
        storeTaskInLocalStorage(taskInput.value);


        taskInput.value = "";   //清除input

    }
    e.preventDefault();
}

// removeTask
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            // e.target是i标签；e.target.parentElement是包裹的a标签；
            // e.target.parentElement.parentElement是a标签的父元素，即这个li
            e.target.parentElement.parentElement.remove();

            // 删除本地存储任务
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// clearTasks
function clearTasks(){
    // methods 1 :low efficient
    // taskList.innerHTML ="";

    // methods 2
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // 清除localStorage
    clearTasksFromLocalStorage();
}

// filterTasks
function filterTasks(e){
    /* 1.获取filter的value；2.获取li里的所有value；3.进行匹配:通过style.display设置显示隐藏。 */
    const text = e.target.value.toLowerCase(); //e.target是keyup对象；
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        // forEach就是每一项单独执行下面的循环
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    })
}

// storeTaskInLocalStorage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        // tasks = localStorage.getItem('tasks');得到的是一个字符串
        // 这里需要存储为数组
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// getTask
function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        // tasks = localStorage.getItem('tasks');得到的是一个字符串
        // 这里需要存储为数组
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // 通过forEach将localStorage中的tasks，
    // 展示到任务列表，即执行addTask函数中的主要操作（copy过来）
    tasks.forEach(function(task){
        
        const li = document.createElement('li');
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));//注意：这里传值改变

        const link = document.createElement('a');
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-times"></i>';
        
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

// removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem){
    // 获取本地存储的tasks（这里是从getTask函数中copy过来）
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // 通过forEach判断删除的task-list是否
    // 和localStorage中存储的tasks数组中的task值相等；
    // 相等的话，则删除
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
        localStorage.setItem('tasks',JSON.stringify(tasks))
    })
}

// clearTasksFromLocalStorage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}