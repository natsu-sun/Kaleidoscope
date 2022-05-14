const cv = document.getElementById('cv')
cv.width = cv.height = 400

const ctx = cv.getContext("2d")
ctx.textBaseline = "middle"
ctx.textAlign = "center"

document.getElementById('text').addEventListener('input', refresh)

document.getElementById('size').addEventListener('input', rangeOnChange)
document.getElementById('x').addEventListener('input', rangeOnChange)
document.getElementById('y').addEventListener('input', rangeOnChange)
document.getElementById('r').addEventListener('input', rangeOnChange)
document.getElementById('n').addEventListener('input', rangeOnChange)

refresh()


function refresh() {
    const text = document.getElementById('text').value
    const sz = +document.getElementById('size').value
    const x = +document.getElementById('x').value
    const y = +document.getElementById('y').value
    const r = +document.getElementById('r').value
    const n = +document.getElementById('n').value

    const ang = 360 / n
    const deg = ang * Math.PI / 180

    ctx.font = "bold " + sz + "px sans-serif"

    ctx.resetTransform()
    ctx.clearRect(0, 0, cv.width, cv.height)
    
    ctx.translate(cv.width/2, cv.height/2)
    ctx.rotate(r * Math.PI / 180)
    for (let i=0; i<n; i++) {
        ctx.rotate(deg)
        ctx.fillText(text, x, y)
      }
}

function getValueById(id) {
    return document.getElementById(id).value
}

// inputイベント時に値をセットする関数
function rangeOnChange(e) {
    const t = document.getElementById("v-" + e.target.id)
    t.innerText = e.target.value;
    refresh()
}