// 万華鏡キャンバス
const cv = document.createElement("canvas")
cv.width = cv.height = 400
const ctx = cv.getContext("2d")
// 文字キャンバス
const tcv = document.createElement("canvas")
tcv.width = tcv.height = 400
const tctx = tcv.getContext("2d")
tctx.textBaseline = "middle"
tctx.textAlign = "center"

document.getElementById('text').addEventListener('input', refresh)

document.getElementById('size').addEventListener('input', rangeOnChange)
document.getElementById('x').addEventListener('input', rangeOnChange)
document.getElementById('y').addEventListener('input', rangeOnChange)
document.getElementById('r').addEventListener('input', rangeOnChange)
document.getElementById('n').addEventListener('input', rangeOnChange)

refresh()


function refresh() {
    // 文字生成
    const text = document.getElementById('text').value
    const sz = +document.getElementById('size').value
    const r = +document.getElementById('r').value

    tctx.font = "bold " + sz + "px sans-serif"
    tctx.resetTransform()
    tctx.clearRect(0, 0, tcv.width, tcv.height)
    tctx.translate(tcv.width/2, tcv.height/2)
    tctx.rotate(r * Math.PI / 180)
    tctx.fillText(text, 0, 0)

    // 万華鏡生成
    const x = +document.getElementById('x').value
    const y = +document.getElementById('y').value
    const n = +document.getElementById('n').value

    const ang = 360 / n
    const deg = ang * Math.PI / 180

    ctx.resetTransform()
    ctx.clearRect(0, 0, cv.width, cv.height)
    
    ctx.translate(cv.width/2, cv.height/2)
    for (let i=0; i<n; i++) {
        ctx.rotate(deg)
        ctx.drawImage(tcv, x-cv.width/2, y-cv.height/2)
    }

    cv2img()
}

// inputイベント時に値をセットする関数
function rangeOnChange(e) {
    const t = document.getElementById("v-" + e.target.id)
    t.innerText = e.target.value;
    refresh()
}

function cv2img() {
    document.getElementById("cv").src = cv.toDataURL("image/png")
}