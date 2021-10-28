// process the current time and return it to the header
export function formateTime(time) {
    if(!time) return ''
    var date = new Date(time)
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    + " " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() 
}