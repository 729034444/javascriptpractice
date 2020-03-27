const container = document.getElementById('container')
const circlesArr = []

let rows = 15;
let cols = 15;

for(let i =0; i < cols; i++){
    circlesArr[i] = [];
    for(let j = 0; j < rows; j++){
        // 创建小球circle
        const circle = document.createElement('div');
        // 为circle添加class，小球出现 
        circle.classList.add('circle');
        // 将小球添加到container中
        container.appendChild(circle);
        // 将小球添加到数组中
        circlesArr[i].push(circle);
    }
}


// ####forEach
circlesArr.forEach((cols,i) => {
    cols.forEach((circle,j) => {
        circle.addEventListener("click", () => {
            growCircles(i, j);
        })
    })
})

function growCircles(i,j){
    if(circlesArr[i] && circlesArr[i][j]){
        if(!circlesArr[i][j].classList.contains('grow')){
            circlesArr[i][j].classList.add('grow');
            setTimeout(() => {
                growCircles(i-1,j);
                growCircles(i+1,j);
                growCircles(i,j-1);
                growCircles(i,j+1);
            },100);

            setTimeout(() => {
                circlesArr[i][j].classList.remove("grow");
            },300)
        }
    }
}
