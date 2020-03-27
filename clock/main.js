var hr = document.querySelector('.hr')
var mn = document.querySelector('.mn')
var sc = document.querySelector('.sc')

function mytime(){
    var date = new Date();
    // 360° 12小时 60分钟；60秒钟
    var hh = date.getHours() * 30;//每小时30°，所以当前时间要乘以度数
    var mm = date.getMinutes() * 6;//每分钟6°
    var ss = date.getSeconds() * 6;//每秒钟6°

    // js控制css
    hr.style.transform = 'rotate('+(hh+mm/12)+'deg)';
    mn.style.transform = 'rotate('+mm+'deg)';
    sc.style.transform = 'rotate('+ss+'deg)';
}
setInterval('mytime()');