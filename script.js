
const canvas = document.getElementById('fightCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const winnerText = document.getElementById('winnerText');

let fighter1, fighter2, winner;
let fightInterval;
const duration = 20000; // 20 seconds
const fps = 60;
let elapsed = 0;

function random(min, max) { return Math.random() * (max - min) + min; }

function generateFighter(name) {
    const builds = ['slim', 'muscular', 'bulky'];
    const powers = ['punch', 'kick', 'energy blast', 'slash', 'fireball', 'ice', 'lightning'];
    return {
        name: name,
        x: random(50, canvas.width / 2 - 50),
        y: canvas.height - 100,
        color: `hsl(${Math.random()*360}, 80%, 50%)`,
        size: random(30, 60),
        build: builds[Math.floor(Math.random()*builds.length)],
        power: powers[Math.floor(Math.random()*powers.length)],
        dx: 2,
        dy: 0
    };
}

function drawFighter(f) {
    ctx.fillStyle = f.color;
    ctx.beginPath();
    ctx.arc(f.x, f.y - f.size/2, f.size/2, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.fillText(f.name, f.x - f.size/2, f.y - f.size - 10);
}

function drawAttack(f) {
    ctx.strokeStyle = f.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(f.x, f.y - f.size/2);
    ctx.lineTo(f.x + random(-50,50), f.y - f.size - random(20,50));
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.arc(f.x, f.y - f.size/2, 30, 0, Math.PI*2);
    ctx.fill();
}

function drawFinisher(f) {
    ctx.fillStyle = 'rgba(255,255,0,0.5)';
    ctx.beginPath();
    ctx.arc(f.x, f.y - f.size/2, 100, 0, Math.PI*2);
    ctx.fill();
    for(let i=0;i<10;i++){
        ctx.strokeStyle = 'yellow';
        ctx.beginPath();
        ctx.moveTo(f.x, f.y - f.size/2);
        ctx.lineTo(f.x + random(-200,200), f.y - f.size/2 - random(100,200));
        ctx.stroke();
    }
}

function animateFight() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fighter1.x += fighter1.dx * (Math.random() > 0.5 ? 1 : -1);
    fighter2.x += fighter2.dx * (Math.random() > 0.5 ? 1 : -1);
    fighter1.x = Math.max(50, Math.min(canvas.width-50, fighter1.x));
    fighter2.x = Math.max(50, Math.min(canvas.width-50, fighter2.x));
    drawFighter(fighter1);
    drawFighter(fighter2);
    if(Math.random() < 0.15){ drawAttack(fighter1); }
    if(Math.random() < 0.15){ drawAttack(fighter2); }
    elapsed += 1000/fps;
    if(elapsed >= 15000 && !winner){ winner = Math.random() > 0.5 ? fighter1 : fighter2; drawFinisher(winner); }
    if(elapsed >= duration){ clearInterval(fightInterval); winnerText.innerText = `Winner: ${winner.name}`; }
}

startBtn.addEventListener('click', () => {
    const name1 = document.getElementById('fighter1').value || 'Fighter 1';
    const name2 = document.getElementById('fighter2').value || 'Fighter 2';
    fighter1 = generateFighter(name1);
    fighter2 = generateFighter(name2);
    winner = null;
    elapsed = 0;
    winnerText.innerText = '';
    fightInterval = setInterval(animateFight, 1000/fps);
});
